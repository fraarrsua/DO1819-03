'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    Actor = mongoose.model('Actor'),
    Trip = mongoose.model('Trip');

var applicationSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    default: 'PENDING',
    enum: ['PENDING', 'REJECTED', 'DUE', 'ACCEPTED', 'CANCELLED']
  },
  consumerName:{
    type: String,
    required: 'Consumer name required'
  },
  dateApplication: {
    type: Date,
    default: Date.now
  },
  datePayment: {
    type: Date
  },
  cancelationMoment: {
    type: Date
  },
  rejectionComment: {
    type: String
  },
  comments: [String],
  total:{
    type: Number,
    min: 0
  },
  explorerID: {
    type: Schema.Types.ObjectId,
    ref: "Actor",
    required: 'explorer id required'
  },
  tripID: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
    required: 'trip id required'
  },
  managerID: {
    type: Schema.Types.ObjectId,
    ref: "Actor",
    required: 'manager id required'
  }
}, { strict: false });


//Check if the author is an explorer
applicationSchema.pre('save', function(next){

  var new_application = this;
  var explorer_id = new_application.explorerID;

  if(explorer_id){
    Actor.findOne({_id:explorer_id}, function(err, res){
        if(err){
          next(err);
        }else{
          if(!res){
            next(new Error("There is not any Explorer with id: "+ explorer_id));
          }else{
            if(!(res.role === 'EXPLORER')){
              next(new Error("The Explorer with id: "+ explorer_id+" is not an EXPLORER Actor"));
            }else{
              next();
            }
          }
        }
    });
  }
});

//Check if the trip exists
applicationSchema.pre('save', function(next){

  var new_application = this;
  var trip_id = new_application.tripID;

  if(trip_id){
    Trip.findOne({_id:trip_id}, function(err, res){
        if(err){
          next(err);
        }else{
          if(!res){
            next(new Error("There is not any trip with id: "+ trip_id));
          }else{           
              next();
          }
        }
    });
  }
});


module.exports = mongoose.model('Application', applicationSchema);
