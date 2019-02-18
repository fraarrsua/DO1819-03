'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//SponsorshipSchema
var SponsorshipSchema = new Schema({
    sponsorId:{
      type: Schema.Types.ObjectId,
      ref: "Actor",
      required: 'sponsor actor id required'
    },
    tripId:{
      type: Schema.Types.ObjectId,
      ref: "Trips"
    },
    banner:{
      data: Buffer, 
      contentType: String
    },
    link:{
      type: String,
      required: 'Link is required'
    },
    paid:{
      type: Boolean,
      default: false,
      required: 'Paid status is required'
    }
  }, { strict: false });
  
module.exports = mongoose.model('Sponsorships', SponsorshipSchema);
