var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    //Models
    Actor = require('./api/models/actorModel'),
    Finder = require('./api/models/finderModel'),
    Trip = require('./api/models/tripModel'),
    Application = require('./api/models/applicationModel'),
    Sponsorship = require('./api/models/sponsorshipModel'),
    DataWareHouse = require('./api/models/dataWareHouseModel'),
    DataWareHouseTools = require('./api/controllers/dataWareHouseController'),
    bodyParser = require('body-parser');

// MongoDB URI building
var mongoDBHostname = process.env.mongoDBHostname || "localhost";
var mongoDBPort = process.env.mongoDBPort || "27017";
var mongoDBName = process.env.mongoDBName || "ACME-Explorer";
var mongoDBURI = "mongodb://" + mongoDBHostname + ":" + mongoDBPort + "/" + mongoDBName;


mongoose.connect(mongoDBURI, {
    reconnectTries: 10,
    reconnectInterval: 500,
    poolSize: 10, // Up to 10 sockets
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // skip trying IPv6
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routesActors = require('./api/routes/actorRoutes');
var routesSponsorships = require('./api/routes/sponsorshipRoutes');
var routesTrips = require('./api/routes/tripRoutes');
var routesApplications = require('./api/routes/applicationRoutes');
var routesFinders = require('./api/routes/finderRoutes');
var routesDataWareHouse = require('./api/routes/dataWareHouseRoutes');


routesFinders(app);
routesActors(app);
routesSponsorships(app);
routesTrips(app);
routesApplications(app);
routesDataWareHouse(app);




console.log("Connecting DB to: " + mongoDBURI);
mongoose.connection.on("open", function (err, conn) {
    app.listen(port, function () {
        console.log('ACME-Explorer-CloudTeam RESTful API server started on: http://localhost:' + port + "/");
    });
});

mongoose.connection.on("error", function (err, conn) {
    console.error("DB init error " + err);
});

//Se crea por primera vez el trabajo CRON
DataWareHouseTools.createDataWareHouseJob();