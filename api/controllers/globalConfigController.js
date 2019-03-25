'use strict';

/*---------------GLOBAL CONFIG----------------------*/
var mongoose = require('mongoose'),
globalConfig = mongoose.model('globalConfig');


exports.get_global_config = function (req, res) {
     
    globalConfig.find( function (err, config) {
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
    var global_config = new globalConfig (req.body);
  
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
  };


  exports.post_global_config_v2= function(req,res){}
  exports.get_global_config_v2= function(req,res){}