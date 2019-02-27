'use strict';

/*---------------FINDER----------------------*/
var mongoose = require('mongoose'),
  Finder = mongoose.model('Finder');

exports.post_a_finder = function(req, res){
    var new_finder = new Finder(req.body);

    Finder.save(new_finder, function(err, res){
        if(err){
            console.log(Date().now()+ ":"+err);
            res.send(err);
        }else{
            res.status(201).json(res);
        }
    });
}


exports.read_a_finder = function(req, res) {
    Trip.findById(req.params.explorerID, function(err, finder) {
      if (err){
        res.send(err);
      }
      else{
        res.json(finder);
      }
    });
};

exports.update_a_finder = function(req, res) {
    //Check that the user is administrator if it is updating more things than comments and if not: res.status(403); "an access token is valid, but requires more privileges"
      Finder.findOneAndUpdate({_id: req.params.explorerID}, req.body, {new: true}, function(err, finder) {
        if (err){
          res.send(err);
        }
        else{
          res.json(finder);
        }
      });
  };