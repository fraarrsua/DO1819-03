'use strict';

/*---------------GLOBAL CONFIG----------------------*/
var mongoose = require('mongoose'),
  globalConfig = mongoose.model('globalConfig');


exports.get_global_config = function (req, res) {

  console.log(Date() + ": GET /api/v1/config");

  globalConfig.find(function (err, config) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    }
    else {
      console.log(Date() + ": Sending all global configuration.");
      res.status(200).json(config);
    }
  });
}

exports.post_global_config = function (req, res) {

  console.log(Date() + ": POST /api/v1/config");

  var global_config = new globalConfig(req.body);

  //If exits one global config register don't allow new one
  globalConfig.find({}, function (err, data) {
    if (data.length != 0) {
      console.log(Date()+": Global Config already exists.");
      res.status(422).send("Global Config already exists.");
    } else {
      global_config.save(function (err, config) {
        if (err) {
          console.log(Date() + ": " + err);
          res.send(err);
        }
        else {
          console.log(Date() + ": " + "Global configuration created");
          res.status(201).send(config);
        }
      });
    }
  });
};


exports.update_global_config = function(req,res){

  console.log(Date() + ": PUT /api/v1/config");

  var newConfig = {};

  globalConfig.find({}, function(err, config){
    if(err){
      console.log(Date()+": "+err);
      res.status(500).send(err);
    }else{
      if(req.query.flatRate){
        console.log(Date()+": Request for change flatRate: "+req.query.flatRate);
        newConfig.flatRate = parseInt(req.query.flatRate);
      }else{
        newConfig.flatRate = config[0].flatRate;
      }
      if(req.query.finderResults){
        console.log(Date()+": Request for change finderResults: "+req.query.finderResults);
        newConfig.finderResults = parseInt(req.query.finderResults);
      }else{
        newConfig.finderResults = config[0].finderResults;
      }
      if(req.query.finderTimeToCached){
        console.log(Date()+": Request for change finderTimeToCached: "+req.query.finderTimeToCached);
        newConfig.finderTimeToCached  = parseInt(req.query.finderTimeToCached);
      }else{
        newConfig.finderTimeToCached = config[0].finderTimeToCached;
      }
    }

    globalConfig.findOneAndUpdate({_id: config[0]._id}, newConfig, {new:true}, function(err,conf){
      if(err){
        console.log(Date()+": "+err);
        res.status(500).send(err);
      }else{
        console.log(Date()+": Global Configuration updated.");
        res.status(200).json(conf);
      }
    });
  });

  

}


exports.post_global_config_v2 = function (req, res) { }
exports.get_global_config_v2 = function (req, res) { }
exports.update_global_config_v2 = function (req, res) { }