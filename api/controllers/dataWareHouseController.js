var async = require("async");
var mongoose = require('mongoose'),
    DataWareHouse = mongoose.model('DataWareHouse'),
    Trips = mongoose.model('Trip'),
    Finders = mongoose.model('Finder'),
    Applications = mongoose.model('Application');


//Get Datawarehouse
exports.list_all_indicators = function (req, res) {

    console.log(Date() + 'GET /v1/DataWareHouse');
    DataWareHouse.find().sort("-computationMoment").exec(function (err, indicators) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(indicators);
        }
    });
};

//Get Last Indicator
exports.last_indicator = function (req, res) {

    console.log(Date() + 'GET /v1/dataWareHouse/latest');
    DataWareHouse.find().sort("-computationMoment").limit(1).exec(function (err, indicators) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(indicators);
        }
    });
};

//Importaciones para CRON
var CronJob = require('cron').CronJob;
var CronTime = require('cron').CronTime;

//'0 0 * * * *' una hora
//'*/30 * * * * *' cada 30 segundos
//'*/10 * * * * *' cada 10 segundos
//'* * * * * *' cada segundo
<<<<<<< HEAD
var rebuildPeriod = '*/10 * * * * *';  //El que se usará por defecto
var computeDataWareHouseJob;

exports.rebuildPeriod = function(req, res) {
  console.log('Updating rebuild period. Request: period:'+req.query.rebuildPeriod);
  rebuildPeriod = req.query.rebuildPeriod;
  computeDataWareHouseJob.setTime(new CronTime(rebuildPeriod));
  computeDataWareHouseJob.start();

  res.json(req.query.rebuildPeriod);
};

function createDataWareHouseJob(){
      computeDataWareHouseJob = new CronJob(rebuildPeriod,  function() {
      
      var new_dataWareHouse = new DataWareHouse();
      console.log('Cron job submitted. Rebuild period: '+rebuildPeriod);
      async.parallel([
        computeTopCancellers,
        computeTopNotCancellers,
        computeBottomNotCancellers,
        computeTopExplorers,
        computeBottomExplorers,
        computeRatioCancelledOrders
      ], function (err, results) {
        if (err){
          console.log("Error computing datawarehouse: "+err);
        }
        else{
          //console.log("Resultados obtenidos por las agregaciones: "+JSON.stringify(results));
          new_dataWareHouse.topCancellers = results[0];
          new_dataWareHouse.topNotCancellers = results[1];
          new_dataWareHouse.bottomNotCancellers = results[2];
          new_dataWareHouse.topExplorers = results[3];
          new_dataWareHouse.bottomExplorers = results[4];
          new_dataWareHouse.ratioCancelledOrders = results[5];
          new_dataWareHouse.rebuildPeriod = rebuildPeriod;
    
          new_dataWareHouse.save(function(err, datawarehouse) {
            if (err){
              console.log("Error saving datawarehouse: "+err);
            }
            else{
              console.log("new DataWareHouse succesfully saved. Date: "+new Date());
            }
          });
        }
      });
    }, null, true, 'Europe/Madrid');
}

module.exports.createDataWareHouseJob = createDataWareHouseJob;

function computeTopCancellers (callback) {
   Application.aggregate([
    {$match:{ dateCancelation: { $exists: true } }},
    {$facet:{
        preComputation: [
        {$group : {_id:"$explorerId", ordersCanceled:{$sum:1}}},
        {$group: {_id:null, nCanceladores: {$sum: 1}}},
        {$project: {_id:0,limitTopPercentage: { $ceil: {$multiply: [ "$nCanceladores", 0.1 ]}}}}
        ],
        canceladores: [{$project:{_id:0,consumer:1}},{$group : {_id:"$explorerId", ordersCanceled:{$sum:1}}},  { $sort:{"ordersCanceled":-1}}]
        }
    },
    { $project: { topCanceladores: { $slice: [ "$canceladores", { $arrayElemAt: [ "$preComputation.limitTopPercentage", 0 ] } ] }}}
    ], function(err, res){
        callback(err, res[0].topCanceladores)
    }); 
};

function computeTopNotCancellers(callback) {
  Application.aggregate([
    {$match:{ dateCancelation: { $exists: false } }},
    {$facet:{
        preComputation: [
        {$group : {_id:"$explorerId", ordersNotCanceled:{$sum:1}}},
        {$group: {_id:null, nNoCanceladores: {$sum: 1}}},
        {$project: {_id:0,limitTopPercentage: { $ceil: {$multiply: [ "$nNoCanceladores", 0.1 ]}}}}
        ],
        noCanceladores: [{$project:{_id:0,consumer:1}},{$group : {_id:"$explorerId", ordersNotCanceled:{$sum:1}}},  { $sort:{"ordersNotCanceled":-1}}]
        }
    },
    { $project: { topNoCanceladores: { $slice: [ "$noCanceladores", { $arrayElemAt: [ "$preComputation.limitTopPercentage", 0 ] } ] }}}
    ], function(err, res){
      callback(err, res[0].topNoCanceladores)
  });
};

function computeBottomNotCancellers(callback) {
  Application.aggregate([
    {$match:{ dateCancelation: { $exists: false } }},
    {$facet:{
        preComputation: [
        {$group : {_id:"$explorerId", ordersNotCanceled:{$sum:1}}},
        {$group: {_id:null, nNoCanceladores: {$sum: 1}}},
        {$project: {_id:0,limitTopPercentage: { $ceil: {$multiply: [ "$nNoCanceladores", 0.1 ]}}}}
        ],
        noCanceladores: [{$project:{_id:0,consumer:1}},{$group : {_id:"$explorerId", ordersNotCanceled:{$sum:1}}},  { $sort:{"ordersNotCanceled":1}}]
        }
    },
    { $project: { bottomNoCanceladores: { $slice: [ "$noCanceladores", { $arrayElemAt: [ "$preComputation.limitTopPercentage", 0 ] } ] }}}
    ], function(err, res){
      callback(err, res[0].bottomNoCanceladores)
  });
};

function computeTopExplorers (callback) {
  Application.aggregate([
    {$match:{ deliveryMoment: { $exists: true } }},
    {$facet:{
        preComputation: [
        {$group : {_id:"$explorer", ordersDelivered:{$sum:1}}},
        {$group: {_id:null, nDeliverers: {$sum: 1}}},
        {$project: {_id:0,limitTopPercentage: { $ceil: {$multiply: [ "$nDeliverers", 0.1 ]}}}}
        ],
        deliverers: [{$project:{_id:0,explorer:1}},{$group : {_id:"$explorer", ordersDelivered:{$sum:1}}},  { $sort:{"ordersDelivered":-1}}]
        }
    },
    { $project: { topDeliverers: { $slice: [ "$deliverers", { $arrayElemAt: [ "$preComputation.limitTopPercentage", 0 ] } ] }}}
    ], function(err, res){
      callback(err, res[0].topDeliverers)
  });
};

function computeBottomExplorers (callback) {
  Application.aggregate([
    {$match:{ deliveryMoment: { $exists: true } }},
    {$facet:{
        preComputation: [
        {$group : {_id:"$explorer", ordersDelivered:{$sum:1}}},
        {$group: {_id:null, nDeliverers: {$sum: 1}}},
        {$project: {_id:0,limitTopPercentage: { $ceil: {$multiply: [ "$nDeliverers", 0.1 ]}}}}
        ],
        deliverers: [{$project:{_id:0,explorer:1}},{$group : {_id:"$explorer", ordersDelivered:{$sum:1}}},  { $sort:{"ordersDelivered":1}}]
        }
    },
    { $project: { bottomDeliverers: { $slice: [ "$deliverers", { $arrayElemAt: [ "$preComputation.limitTopPercentage", 0 ] } ] }}}
    ], function(err, res){
      callback(err, res[0].bottomDeliverers)
  });
};

function computeRatioCancelledOrders (callback) {
  Application.aggregate([
    {$project : { 
    "placementMonth" : { "$month" : "$placementMoment" }, 
    "placementYear" : {"$year" : "$placementMoment" },
    "dateCancelation": 1 }},
    {$match:{ "placementMonth" : new Date().getMonth()+1,
                             "placementYear" : new Date().getFullYear() 
                             }},
            {$facet:{
        totalOrdersCurrentMonth: [{$group : {_id:null, totalOrders:{$sum:1}}}],
        totalCancelledOrdersCurrentMonth: [
        {$match:{"dateCancelation": { $exists: true }}},
        {$group : {_id:null, totalOrders:{$sum:1}}}]
        }
            },
    
            {$project: {_id:0,ratioOrdersCancelledCurrentMont: { $divide: [{$arrayElemAt: [ "$totalCancelledOrdersCurrentMonth.totalOrders", 0 ]}, {$arrayElemAt: [ "$totalOrdersCurrentMonth.totalOrders", 0 ]} ]}}} 
    ], function(err, res){
      callback(err, res[0].ratioOrdersCancelledCurrentMont)
  });
=======
//Periodo por defecto en el que se van a ejecutar todas estas agregaciones.
//En este ejemplo se recomputan las agregaciones cada 10 segundos (No recomendable con grandes volumenes de datos)
var rebuildPeriod = '*/30 * * * * *';  //El que se usará por defecto
var computeDataWareHouseJob;

//Contesta a la petición post en la que un administrador puede indicar un nuevo periodo de computación
exports.rebuildPeriod = function (req, res) {

    console.log(Date() + 'POST /v1/DataWareHouse');
    console.log('Updating rebuild period. Request: period:' + req.query.rebuildPeriod);
    rebuildPeriod = req.query.rebuildPeriod;
    computeDataWareHouseJob.setTime(new CronTime(rebuildPeriod));
    computeDataWareHouseJob.start();

    res.json(req.query.rebuildPeriod);
};


//Crea el trabajo CRON (lo da de alta con el periodo por defecto)
//Esta función se lanza siempre al principio de la aplicación, después de conectar con la base de datos (app.js)

function createDataWareHouseJob() {

    //Doy de alta el CRON y le indico la periodicidad (defecto: 10 seg)
    computeDataWareHouseJob = new CronJob(rebuildPeriod, function () {

        var new_dataWareHouse = new DataWareHouse();
        console.log('Cron job submitted. Rebuild period: ' + rebuildPeriod);
        //Se ejecutan todas las funciones de forma paralela
        async.parallel([
            computeTripsManagerStats,
            computeApplicationsTripStats,
            computePriceTripStats,
            computeApplicationsRatioPerStatus
            //computeAveragePriceFinderStats,
            //computeTopKeywordsFinderStats
        ], function (err, results) { //Función que recoje los resultados de las computaciones anteriores
            if (err) {
                console.log("Error computing datawarehouse: " + err);
            }
            else {
                //Se almacenan los resultados de la computaciones y los guardo en el datawarehouse
                console.log("Resultados obtenidos por las agregaciones: "+JSON.stringify(results));
                new_dataWareHouse.tripsManagerStats = results[0];
                new_dataWareHouse.applicationsTripStats = results[1];
                new_dataWareHouse.priceTripStats = results[2];
                new_dataWareHouse.applicationsRatioPerStatus = results[3];
                new_dataWareHouse.averagePriceFinderStats = results[4];
                new_dataWareHouse.topKeywordsFinderStats = results[5];
                new_dataWareHouse.rebuildPeriod = rebuildPeriod;

                new_dataWareHouse.save(function (err, datawarehouse) {
                    if (err) {
                        console.log("Error saving datawarehouse: " + err);
                    }
                    else {
                        console.log(Date()+": new DataWareHouse succesfully saved. Date: " + new Date());
                        console.log(datawarehouse);
                    }
                });
            }
        });
    }, null, true, 'Europe/Madrid');
}

//Use for create CRON JOB for first time in app.js
module.exports.createDataWareHouseJob = createDataWareHouseJob;


//La media, minimo, máximo y desviación estándar del número de viajes controlados por manager.
function computeTripsManagerStats(callback) {
    console.log("Ejecuta computeTripsManagerStats");
    Trips.aggregate([
        {
            $group: {
                _id: "managerID",
                tripbyactor: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: 0,
                avg: { $avg: "$tripbyactor" },
                min: { $min: "$tripbyactor" },
                max: { $max: "$tripbyactor" },
                stdev: { $stdDevPop: "$tripbyactor" }
            }
        },
        { $project: { _id: 0 } }
    ], function (err, res) {
        console.log(res[0]);
        callback(err, res[0]);
    });

};

//La media, mínimo, máximo y desviación estándar del número de aplicaciones por viaje.

function computeApplicationsTripStats(callback) {
    console.log("Ejecuta computeApplicationsTripStats");

    Applications.aggregate([
        { $group: { _id: "$tripID", applicationTrips: { $sum: 1 } } },
        {
            $group: {
                _id: 0,
                avg: { $avg: "$applicationTrips" },
                min: { $min: "$applicationTrips" },
                max: { $max: "$applicationTrips" },
                stdev: { $stdDevPop: "$applicationTrips" }
            }
        }
    ], function (err, res) {
        console.log(res[0]);
        callback(err, res[0]);
    });

};

//La media, mínimo, máximo y desviación estándar del precio de los viajes.

function computePriceTripStats(callback) {
    console.log("Ejecuta computePriceTripStats");

    Trips.aggregate([
        {
            $group: {
                _id: "$price",
                tripsactor: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: 0, avg:
                    { $avg: "$tripsactor" },
                min: { $min: "$tripsactor" },
                max: { $max: "$tripsactor" },
                stdev: { $stdDevPop: "$tripsactor" }
            }
        }
    ], function (err, res) {
        console.log(res[0]);
        callback(err, res[0])
    });
};

//El ratio de aplicaciones agrupadas por estado (DUE, PENDING, ACCEPTED...).

function computeApplicationsRatioPerStatus(callback) {
    console.log("Ejecuta computeApplicationsRatioPerStatus");
    
    Applications.aggregate([
        {
            $facet: {
                totalApplications: [{ $group: { _id: null, totalapplicationsTotals: { $sum: 1 } } }],
                groups: [{ $group: { _id: "$status", total: { $sum: 1 } } }],
            }
        },
        { $project: { _id: 0, groupsTotal: "$groups", totalApplications: "$totalApplications.totalapplicationsTotals" } },
        { $unwind: "$totalApplications" },
        { $unwind: "$groupsTotal" },
        { $project: { _id: 0, status: "$groupsTotal._id", ratio: { $divide: ["$groupsTotal.total", "$totalApplications"] } } }
    ], function (err, res) {
        console.log(res[0]);
        callback(err, res[0])
    });
};

//La media de priceMax y priceMin que los explorers indican en sus búsquedas.

function computeAveragePriceFinderStats(callback) {

};

//Una lista con las 10 keywords más repetidas en las búsquedas, ordenadas de mayor a menor.
function computeTopKeywordsFinderStats(callback) {

>>>>>>> be0037f2b1dbf966c5a65089955a20ce9c13b70e
};