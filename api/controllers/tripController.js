'use strict';

/*---------------TRIP----------------------*/
var mongoose = require('mongoose'),
  Trip = mongoose.model('Trip');

exports.list_all_trips = function (req, res) {

  console.log(Date() + ": " + "GET /v1/trips");

  Trip.find({}, function (err, trips) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": Sending all trips.");
      res.status(200).json(trips);
    }
  });
};


exports.create_a_trip = function (req, res) {

  console.log(Date() + ": " + "POST /v1/trips");

  var new_trip = new Trip(req.body);
  
  new_trip.save(function (err, trip) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": " + "Trip created.");
      res.status(201).json(trip);
    }
  });
};


exports.read_a_trip = function (req, res) {

  console.log(Date() + ": " + "GET /v1/trips/:tripId");
  Trip.findById(req.params.tripID, function (err, trip) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": " + " Sending trip.");
      res.status(200).json(trip);
    }
  });
};


exports.update_a_trip = function (req, res) {

  console.log(Date() + ": " + "PUT /v1/trips/:tripId");

  Trip.findOneAndUpdate({ _id: req.params.tripID }, req.body, { new: true }, function (err, trip) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": " + " Trip updated.");
      res.status(200).json(trip);
    }
  });
};

exports.delete_a_trip = function (req, res) {

  console.log(Date() + ": " + "DELETE /v1/trips/:tripId");

  Trip.deleteOne({ _id: req.params.tripID }, function (err, trip) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": " + " Trip deleted.");
      res.json({ message: 'Trip successfully deleted' });
    }
  });
};


exports.search_trips = function (req, res) {
  console.log(Date() + ": " + "GET /v1/trips/search");

  //Check if keyword param exists (keyword: req.query.keyword)
  //Search depending on params but only if deleted = false
  console.log('Searching an trip depending on params');
  res.send('Trip returned from the trip search');
};
