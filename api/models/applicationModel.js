'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  comments: [String],
  total:{
    type: Number,
    min: 0
  },
  explorer: {
    type: Schema.Types.ObjectId,
    ref: "Actors",
    required: 'explorer id required'
  },
  trip: {
    type: Schema.Types.ObjectId,
    ref: "Trips",
    required: 'trip id required'
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Actors",
    required: 'manager id required'
  }
}, { strict: false });

module.exports = mongoose.model('Applications', applicationSchema);
