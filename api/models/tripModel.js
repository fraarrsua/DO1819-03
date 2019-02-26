'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var nanoid = require('nanoid');
const generate = nanoid.generate;
const dateFormat = require('dateformat');

var StageSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the title of the stage'
  },
  description: {
    type: String,
    required: 'Kindly enter the description of the stage'
  },
  price: {
    type: Number,
    required: 'Kindly enter the price of the stage',
    min: 0
  },
  dateInit: {
    type: Date,
    required: 'Kindly enter the date of the stage'
  }
});

var CommentSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the title of the comment'
  },
  author:{
      type: String
  },
  commentText: {
    type: String,
    required: 'Kindly enter your comments'
  }
}, { strict: false });

var tripSchema = new Schema({
  ticker: {
    type: String,
    validate: {
        validator: function(v) {
          return /\d{6}-\w{4}/.test(v);
      },
      message: 'ticket is not valid, Pattern()'
    },
    unique: true
  }, 
  title: {
    type: String,
    required: 'Kindly enter the title of the trip'
  },
  description: {
    type: String,
    required: 'Kindly enter the description of the trip'
  },
  cancelledReason: {
    type: String  
  },
  price: {
    type: Number,
    required: 'Kindly enter the price of the trip',
    min: 0
  },
  dateInit: {
    type: Date,
    required: 'Kindly enter the initial date of the trip'
  },
  dateEnd: {
    type: Date,
    required: 'Kindly enter the end date of the trip'
  },
  pictures: [
    {data: Buffer, contentType: String}
  ],
  stages: [StageSchema],
  comments: [CommentSchema],
  sponsors: [{
    type: Schema.Types.ObjectId,
    ref: "Sponsorships"
  }],
  created: {
    type: Date,
    default: Date.now
  },

}, { strict: false });


// Execute before each trip.save() call
tripSchema.pre('save', function(callback) {
  var new_trip = this;
  var date = new Date;
  var day=dateFormat(new Date(), "yymmdd");

  var generated_ticker = [day, generate('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)].join('-')
  new_trip.ticker = generated_ticker;
  callback();
});

//Execute the sum of the price before each save
tripSchema.pre('save', function(callback){
  var new_trip = this;
  
  //Set the price field to 0
  new_trip.price = 0;

  //Compute the total price
  new_trip.stages.forEach(e => {
    new_trip.price += e.price
  });
  callback();
});

module.exports = mongoose.model('Trip', tripSchema);
module.exports = mongoose.model('Stage', StageSchema);

