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
  dateApplication: {
    type: Date,
    default: Date.now
  },
  paid: {
    type: Boolean,
    default: false
  },
  datePayment: {
    type: Date,
    validate: {
      validator: function (value) {
        return this.dateApplication < value;
      },
      message: 'datePayment must be after ApplicationDate'
    }
  },
  dateCancelation: {
    type: Date,
    validate: {
      validator: function (value) {
        return this.dateApplication < value;
      },
      message: 'cancelationDate must be after ApplicationDate'
    }
  },
  rejectionComment: {
    type: String
  },
  comments: [String],
  explorerId: {
    type: Schema.Types.ObjectId,
    ref: "Actor",
    required: 'explorer id required'
  },
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
    required: 'trip id required'
  }
}, { strict: false });


//Check if the author is an explorer
applicationSchema.pre('save', function(next){

  var new_application = this;
  var explorer_id = new_application.explorerId;

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
  var trip_id = new_application.tripId;

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

applicationSchema.index({status: 'text'});

//INDICES
//Búsqueda por estado devuelve applications ordenadas por viaje
applicationSchema.index({tripId:1, status: 'text'});



module.exports = mongoose.model('Application', applicationSchema);
