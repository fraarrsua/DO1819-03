'use strict';


var mongoose = require('mongoose'),
  Application = mongoose.model('Application');

exports.list_all_applications = function (req, res) {

  //Control if the user is EXPLORER, MANAGER
  //EXPLORER: Return applications created by himself groupedBy status
  //MANAGER: Return applications from trips created by himself

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

  //Check if exists one application with the same explorerID and tripID on the request

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

exports.change_status = function (req, res) {
  //This method is to change the status and control this:
  //PENDING only to REJECTED or DUE

  console.log(Date() + ": New PUT /v1/applications/" + req.params.applicationId + "/change?status=" + req.query.status);

  var newStatus = req.query.status;
  var applicationId = req.params.applicationId;

  if (!newStatus) {
    console.log(Date() + ": The query doesn't have a status param");
    res.status(400).send('This request need a queryParam "status" ');
  } else {

    if (!applicationId) {
      console.log(Date() + ": The params doesn't have an applicationId");
      res.status(400).send('This request need a param "applicationId" ');
    } else {

      //Get the previous status of the application
      Application.findOne({ _id: applicationId }, function (err, application) {
        if (err) {
          console.log(Date() + ": " + err);
          res.send(err);
        } else {
          if (!application) {
            console.log(Date() + ": There is not any application with this applicationId: " + applicationId);
            res.status(422).send("There is not any application with this applicationId: " + applicationId);
          } else {
            //Only pay applications with status=DUE
            if (application.status != "PENDING") {
              console.log(Date() + ": The status of the application is not PENDING. Rejecting request...");
              res.status(422).send('The application status is not PENDING. Only applications with PENDING status can be changed');
            } else {
              if (newStatus == "REJECTED" || newStatus == "DUE") {
                Application.findOneAndUpdate({ _id: applicationId }, { $set: { status: newStatus } }, { new: true }, function (err, application) {
                  if (err) {
                    console.log(Date() + err);
                    res.send(err);
                  } else {
                    res.send(application);
                  }
                });
              } else {
                console.log(Date() + ": The new status of the application is not REJECTED or DUE. Rejecting request...");
                res.status(422).send('The new status is not REJECTED or DUE. Only can change to REJECTED or DUE');

              }
            }
          }
        }
      });
    }

  }


};


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

exports.pay_an_application = function (req, res) {

  console.log(Date() + ": PUT /v1/applications/:applicationId/pay");

  var applicationId = req.params.applicationId;

  //Get the previous status of the application
  Application.findOne({ _id: applicationId }, function (err, application) {
    if (err) {
      console.log(Date() + ": " + err);
      res.send(err);
    } else {
      if (!application) {
        console.log(Date() + ": There is not any application with this applicationId: " + applicationId);
        res.status(422).send("There is not any application with this applicationId: " + applicationId);
      } else {
        //Only pay applications with status=DUE
        if (application.status != "DUE" && !application.paid) {
          console.log(Date() + ": Trying to pay an application which status!=DUE");
          res.status(422).send("WARNING. Trying to pay an application which status!=DUE");
        } else {
          Application.findOneAndUpdate({ _id: applicationId }, { $set: { status: "ACCEPTED", paid: true } }, { new: true }, function (err, application) {
            if (err) {
              console.log(Date() + err);
              res.send(err);
            } else {
              res.send(application);
            }
          });
        }
      }
    }
  });
}

exports.cancel_an_application = function (req, res) {

  console.log(Date() + ": New PUT /v1/applications/applicationId/cancel ")

  var applicationId = req.params.applicationId;

  if (!applicationId) {
    console.log(Date() + ": The request must have an applicationId param");
    res.status(400).send("The request must have an applicationId param");
  } else {
    //Get the previous status of the application
    Application.findOne({ _id: applicationId }, function (err, application) {
      if (err) {
        console.log(Date() + ": " + err);
        res.send(err);
      } else {
        if (!application) {
          console.log()
          res.status(422).send("There is not any application with this applicationId: " + applicationId);
        } else {
          //Only cancel applications with status=ACCEPTED
          if (application.status != "ACCEPTED") {
            console.log(Date() + ": Trying to cancel an application which status!=ACCEPTED");
            res.status(422).send("Trying to cancel an application which status!=ACCEPTED");
          } else {
            Application.findOneAndUpdate({ _id: applicationId }, { $set: { status: "CANCELLED" } }, { new: true }, function (err, application) {
              if (err) {
                console.log(Date() + err);
                res.send(err);
              } else {
                res.send(application);
              }
            });
          }
        }
      }
    });
  }

}



/**-------------------V2 METHODS---------------- */

exports.list_all_applications_v2 = function (req, res) { };
exports.create_an_application_v2 = function (req, res) { };
exports.change_status_v2 = function (req, res) { };
exports.pay_an_application_v2 = function (req, res) { };
exports.cancel_an_application_v2 = function (req, res) { };
