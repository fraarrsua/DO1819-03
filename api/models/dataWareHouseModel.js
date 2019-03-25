'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DataWareHouseSchema = new mongoose.Schema({

  // La media, minimo, máximo y desviación estándar del número de viajes controlados por manager.
  tripsManagerStats: {
    avg: Number, 
    min: Number, 
    max: Number, 
    std: Number
  },
  //  La media, mínimo, máximo y desviación estándar del número de aplicaciones por viaje.
  applicationsTripStats: {
    avg: Number, 
    min: Number, 
    max: Number, 
    std: Number
  },
  //  La media, mínimo, máximo y desviación estándar del precio de los viajes.
  priceTripStats: {
    avg: Number, 
    min: Number, 
    max: Number, 
    std: Number
  },
  // El ratio de aplicaciones agrupadas por estado (DUE, PENDING, ACCEPTED...).
  applicationsRatioPerStatus: {
    DUE: {
      type: Number,
      default: 0
    },
    REJECTED: {
      type: Number,
      default: 0
    },
    PENDING: {
      type: Number,
      default: 0
    },
    ACCEPTED: {
      type: Number,
      default: 0
    },
    CANCELLED: {
      type: Number,
      default: 0
    },
  },

  // La media de priceMax y priceMin que los explorers indican en sus búsquedas.
  averagePriceFinderStats: {
    priceMinAvg: Number,
    priceMaxAvg: Number
  },

  // Una lista con las 10 keywords más repetidas en las búsquedas, ordenadas de mayor a menor.
  topKeywordsFinderStats: [String],

  computationMoment: {
    type: Date,
    default: Date.now
  },
  rebuildPeriod: {
    type: String
  }

}, { strict: false });


//ÍNDICES
//Indice que se usa para extraer cual es el último resultado
DataWareHouseSchema.index({ computationMoment: -1 });

module.exports = mongoose.model('DataWareHouse', DataWareHouseSchema);
