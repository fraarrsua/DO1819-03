'use strict';
/*---------------ACTOR----------------------*/
var mongoose = require('mongoose'),
  Actor = mongoose.model('Actors');

exports.create_an_actor = function (req, res) {

  console.log(Date() + ": " + "POST /v1/actors");
  var new_actor = new Actor(req.body);

  new_actor.save(function (err, actor) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": " + "New actor with role: '" + actor.role + "' added.");
      res.status(201).send(actor);
    }
  });
};

exports.read_an_actor = function (req, res) {

  console.log(Date() + ": " + "GET /v1/actors/:actorId");

  Actor.findById(req.params.actorId, function (err, actor) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": " + "Actor returned: '" + actor.name + actor.surname + ".");
      res.status(200).send(actor);
    }
  });
};

exports.update_an_actor = function (req, res) {

  console.log(Date() + ": " + "PUT /v1/actors/:"+ req.params);
  var actorId = req.params.actorId;
  //We must validate that the body is correct with our ActorSchema
  var actorUpdated = (req.body);

  Actor.findOneAndUpdate({ _id: actorId }, actorUpdated, { new: true }, function (err, actor) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": " + "Actor updated: '" + actor.name +", "+ actor.surname + ".");
      res.status(200).send(actor);
    }
  });
};

exports.ban_an_actor = function (req, res) {

  console.log(Date() + ": " + "PUT /v1/actors/:actorId/ban");

  var actorToBanId = req.params.actorId;
  Actor.findById(actorToBanId, function (err, actorToBan) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    } else {
      if (actorToBan.role != "EXPLORER") {
        console.log(Date() + ": " + " WARNING. Trying to ban an actor with role: " + actorToBan.role + ".")
        res.sendStatus(403);
      } else {
        Actor.findOneAndUpdate({ _id: req.params.actorId }, { $set: { "banned": "true" } }, { new: true }, function (err, actor) {
          if (err) {
            console.log(Date() + ": " + err);
            res.send(err);
          }
          else {
            console.log(Date() + ": " + "Actor with email: '" + actor.email + " is now banned.");
            res.status(200).send(actor);
          }
        });
      }
    }

  });
};