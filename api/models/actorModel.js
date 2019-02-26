'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var FinderSchema = new Schema({
  keyword:{
      type: String,
      required:'Keyword is required'
  },
  priceMin:{
      type: Number,
      required: 'princeMin is required',
      min: 0
  },
  priceMax:{
      type: Number,
      required: 'priceMax is required'
  },
  dateInit:{
      type: Date,
      required: true
  },
  dateEnd:{
      type: Date,
      required: true
  },
  explorerId:{
      type: Schema.Types.ObjectId,
      ref: "Actor",
      required: 'explorer actor id required'
  }
}, { strict: false });


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
    type: String
  },
  password: {
    type: String,
    minlength:5,
    required: 'Kindly enter the actor password'
  },
  preferredLanguage:{
    type : String,
    default : 'en'
  },
  role: {
    type: String,
    required: 'Kindly enter the user role',
    enum: ['EXPLORER', 'MANAGER', 'ADMINISTRATOR', 'SPONSOR']
  },
  banned:{
    type: Boolean,
    defaul: false
  },
  flatRate:{
    type: Boolean,
    defaul: false
  },
  finder:{
    type: FinderSchema,
    default: null
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });


//Controlar si la contraseña se ha modificado y volver a hashearla
ActorSchema.pre('save', function (callback) {
  var actor = this;

  // Sale si la contraseña no ha cambiado
  if (!actor.isModified('password')){
    return callback();
  } 

  // Si la contraseña ha cambiado la hasheamos
  bcrypt.genSalt(5, function (err, salt) {
    if (err) return callback(err);

    bcrypt.hash(actor.password, salt, function (err, hash) {
      if (err) return callback(err);
      actor.password = hash;
      callback();
    });
  });
});

//Controlar si la contraseña viene hasheada
actorSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    console.log(Date()+': Verifying password in ActorModel: ' + password);
    if (err) return cb(err);
    console.log('isMatch: ' + isMatch);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Actor', ActorSchema);
module.exports = mongoose.model('Finder', FinderSchema);