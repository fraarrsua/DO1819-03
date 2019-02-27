'use strict';


var mongoose = require('mongoose'),
  Application = mongoose.model('Application');

exports.list_all_applications = function (req, res) {

  Application.find({}, function (err, applications) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": Sending all trips.");
      res.status(200).json(applications);
    }
  });
};

exports.search_user_applications = function (req, res) {

  var userId = req.params.userID;

  //Search depending on params
  console.log('Searching applications depending on params');
  res.send('Applications returned from the trips search');
};


exports.create_an_application = function (req, res) {

  //Check if the actor is EXPLORER
  var new_application = new Application(req.body);

  new_application.save(function (err, application) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": " + "Application created.");
      res.status(201).send(application);
    }
  });
};


exports.read_an_application = function (req, res) {

  Application.findOne({ _id: req.params.applicationId }, function (err, application) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": " + "Sending Application.");
      res.status(200).send(application);
    }
  });
};

exports.change_status = function(req,res){

    //This method is to change the status and control this:
    //PENDING only to REJECTED or DUE
    //DUE only to ACCEPTED
    //ACCEPTED only to CANCELLED
}


exports.update_an_application = function (req, res) {
  //Check the conditions of the applications and who is the role
    Application.findOneAndUpdate({ _id: req.params.applicationId }, req.body, { new: true }, function (err, application) {
      if (err) {
        console.log(Date() + ": " + err);
        res.send(err);
      }
      else {
        console.log(Date() + ": " + "Application updated.");
        res.status(200).send(application);
      }
    });
};
