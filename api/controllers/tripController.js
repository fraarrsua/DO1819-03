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
  //Check if category param exists (category: req.query.category)
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

exports.list_all_categories = function(req, res) {
  Category.find({}, function(err, categs) {
    if (err){
      res.send(err);
    }
    else{
      res.json(categs);
    }
  });
};

exports.create_a_category = function(req, res) {
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


exports.read_a_category = function(req, res) {
  Category.findById(req.params.categId, function(err, categ) {
    if (err){
      res.send(err);
    }
    else{
      res.json(categ);
    }
  });
};

exports.update_a_category = function(req, res) {
  Category.findOneAndUpdate({_id: req.params.categId}, req.body, {new: true}, function(err, categ) {
    if (err){
      res.send(err);
    }
    else{
      res.json(categ);
  }
  });
};

exports.delete_a_category = function(req, res) {
  Category.deleteOne({_id: req.params.categId}, function(err, categ) {
    if (err){
      res.send(err);
    }
    else{
      res.json({ message: 'Category successfully deleted' });
    }
  });
};


