'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var globalConfigSchema = new Schema({
  flatRate: {
    type: Number,
    required: true,
    min: 0
  },
  finderResults: {
    type: Number,
    max: 100,
    min: 0,
    required: true
  },
  finderTimeToCached: {
    type: Number,
    required: true,
    min: 60,
    max: 1400
  }

}, { strict: false });


module.exports = mongoose.model('globalConfig', globalConfigSchema);