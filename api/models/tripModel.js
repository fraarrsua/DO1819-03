'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const generate = require('nanoid/generate');
const dateFormat = require('dateformat');
var applications = require('./applicationModel');

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
  price: {
    type: Number,
    required: 'Kindly enter the price of the trip',
    min: 0
  },
  list_of_applications: [applications.aplication],
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
  created: {
    type: Date,
    default: Date.now
  },

}, { strict: false });

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


// Execute before each trip.save() call
tripSchema.pre('save', function(callback) {
  var new_trip = this;
  var date = new Date;
  var day=dateFormat(new Date(), "yymmdd");

  var generated_ticker = [day, generate('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6)].join('-')
  new_trip.ticker = generated_ticker;
  callback();
});

module.exports = mongoose.model('trips', tripSchema);
module.exports = mongoose.model('stages', StageSchema);
module.exports = mongoose.model('stages', CommentSchema);
