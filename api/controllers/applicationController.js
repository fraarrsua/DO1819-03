'use strict';


var mongoose = require('mongoose'),
Application = mongoose.model('Applications');

exports.list_all_applications = function(req, res) {

  Application.find({}, function(err, order) {
    if (err){
      res.send(err);
    }
    else{
      res.json(order);
    }
  });
};

exports.list_my_orders = function(req, res) {
  Application.find(function(err, orders) {
    if (err){
      res.send(err);
    }
    else{
      res.json(orders);
    }
  });
};

exports.search_user_applications = function(req, res) {
  
  var userId = req.params.userId;
  
  //Search depending on params
  console.log('Searching orders depending on params');
  res.send('Applications returned from the orders search');
};


exports.create_an_application = function(req, res) {

  //Check if the actor is EXPLORER
  var new_application = new Application(req.body);

  new_application.save(function(error, application) {
    if (error){
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else{
      console.log(Date() + ": " + "New application created.");
      res.status(201).send(application);
    }
  });
};


exports.read_an_application = function(req, res) {

  Application.findById(req.params.applicationId, function(err, application) {
    if (err){
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else{
      console.log(Date() + ": " + "Sponsorship returned.");
      res.status(200).send(application);
    }
  });
};


exports.update_an_application = function(req, res) {
  //Check the conditions of the applications and who is the role
  Application.findById(req.params.applicationId, function(err, order) {
      if (err){
        res.send(err);
      }
      else{
          Application.findOneAndUpdate({_id: req.params.applicationId}, req.body, {new: true}, function(err, application) {
            if (err){
              res.send(err);
            }
            else{
              console.log(Date() + ": " + "Application updated.");
            res.status(200).send(application);
            }
          });
        }
    });
};


exports.delete_an_order = function(req, res) {
  //Check if the order were delivered or not and delete it or not accordingly
  //Check if the user is the proper customer that posted the order and if not: res.status(403); "an access token is valid, but requires more privileges"
  Application.deleteOne({
    _id: req.params.orderId
  }, function(err, order) {
    if (err){
      res.send(err);
    }
    else{
      res.json({ message: 'Application successfully deleted' });
    }
  });
};
