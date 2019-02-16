'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActorSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the actor name'
  },
  surname: {
    type: String,
    required: 'Kindly enter the actor surname'
  },
  email: {
    type: String,
    unique: true,
    required: 'Kindly enter the actor email'
  },
  phone: {
    type: String
  },
  address:{
    type: String,
    required: 'Kindly enter the address'
  },
  password: {
    type: String,
    minlength:5,
    required: 'Kindly enter the actor password'
  },
  preferredLanguage:{
    type : String,
    default : "en"
  },
  role: [{
    type: String,
    required: 'Kindly enter the user role(s)',
    enum: ['EXPLORER', 'MANAGER', 'ADMINISTRATOR', 'SPONSOR']
  }],
  banned:{
    type: Boolean,
    required: 'Banned status is required',
    defaul: false
  },
  search:[{
    type: Schema.Types.ObjectId,
    ref: 'Searchs',
    default: null
  }],
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });


module.exports = mongoose.model('Actors', ActorSchema);