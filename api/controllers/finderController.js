'use strict';

/*---------------FINDER----------------------*/
var mongoose = require('mongoose'),
  Finder = mongoose.model('Finder');

exports.post_a_finder = function (req, res) {

  console.log(Date() + ": " + "POST /v1/finders");

  var new_finder = new Finder(req.body);

  new_finder.save(function (err, finder) {
    if (err) {
      console.log(Date() + ":" + err);
      res.send(err);
    } else {
      res.status(201).json(finder);
    }
  });
}


exports.list_all_finders = function (req, res) {
  console.log(Date() + ": " + "GET /v1/finders");

  Finder.find({}, function (err, finders) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": Sending all finders.");
      res.status(200).json(finders);
    }
  });
}


exports.read_a_finder = function (req, res) {
  console.log(Date() + ": " + "GET /v1/finders/:finderId");
  Finder.findById(req.params.finderId, function (err, finder) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": " + " Sending finder.");
      res.status(200).json(finder);
    }
  });
};

exports.update_a_finder = function (req, res) {
  //Check that the user is administrator if it is updating more things than comments and if not: res.status(403); "an access token is valid, but requires more privileges"
  console.log(Date() + ": " + "PUT /v1/finders/:finderId");

  Finder.findOneAndUpdate({ _id: req.params.finderId }, req.body, { new: true }, function (err, finderUpdated) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": " + " Finder updated.");
      res.status(200).json(finderUpdated);
    }
  });
};




/**--------V2 METHODS---------------- */

exports.list_all_finders_v2= function (req, res) {};
exports.post_a_finder_v2= function (req, res) {};
exports.read_a_finder_v2= function (req, res) {};
exports.update_a_finder_v2= function (req, res) {};




