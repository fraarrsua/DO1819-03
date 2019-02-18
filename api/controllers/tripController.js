'use strict';

/*---------------TRIP----------------------*/
var mongoose = require('mongoose'),
  Trip = mongoose.model('Trips');

exports.list_all_trips = function(req, res) {
  //Check if the user is an administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
  Trip.find(function(err, trips) {
    if (err){
      res.send(err);
    }
    else{
      res.json(trips);
    }
  });
};


exports.create_a_trip = function(req, res) {
  //Check if the user is an administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
  var new_trip = new Trip(req.body);
  new_trip.save(function(err, trip) {
    if (err){
      res.send(err);
    }
    else{
      res.json(trip);
    }
  });
};

exports.search_trips = function(req, res) {
  //Check if keyword param exists (keyword: req.query.keyword)
  //Search depending on params but only if deleted = false
  console.log('Searching an trip depending on params');
  res.send('Trip returned from the trip search');
};


exports.read_a_trip = function(req, res) {
    Trip.findById(req.params.tripId, function(err, trip) {
      if (err){
        res.send(err);
      }
      else{
        res.json(trip);
      }
    });
};


exports.update_a_trip = function(req, res) {
  //Check that the user is administrator if it is updating more things than comments and if not: res.status(403); "an access token is valid, but requires more privileges"
    Trip.findOneAndUpdate({_id: req.params.tripId}, req.body, {new: true}, function(err, trip) {
      if (err){
        res.send(err);
      }
      else{
        res.json(trip);
      }
    });
};

exports.delete_a_trip = function(req, res) {
  //Check if the user is an administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
    Trip.deleteOne({_id: req.params.tripId}, function(err, trip) {
        if (err){
            res.send(err);
        }
        else{
            res.json({ message: 'Trip successfully deleted' });
        }
    });
};


/*---------------STAGE----------------------*/
var mongoose = require('mongoose'),
  Stage = mongoose.model('Stages');

exports.list_all_stages = function(req, res) {
  Category.find({}, function(err, categs) {
    if (err){
      res.send(err);
    }
    else{
      res.json(categs);
    }
  });
};

exports.create_a_stage = function(req, res) {
  var new_categ = new Category(req.body);
  new_categ.save(function(err, categ) {
    if (err){
      res.send(err);
    }
    else{
      res.json(categ);
    }
  });
};


exports.read_a_stage = function(req, res) {
  Category.findById(req.params.stageId, function(err, stage) {
    if (err){
      res.send(err);
    }
    else{
      res.json(categ);
    }
  });
};

exports.update_a_stage = function(req, res) {
  Category.findOneAndUpdate({_id: req.params.stageId}, req.body, {new: true}, function(err, stage) {
    if (err){
      res.send(err);
    }
    else{
      res.json(stage);
  }
  });
};

exports.delete_a_stage = function(req, res) {
  Category.deleteOne({_id: req.params.stageId}, function(err, stage) {
    if (err){
      res.send(err);
    }
    else{
      res.json({ message: 'Stage successfully deleted' });
    }
  });
};


