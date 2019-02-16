'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchSchema = new Schema({
    keyword:{
        type: String,
        required:'Keyword is required'
    },
    priceMin:{
        type: Number,
        required: 'princeMin is required',
        min: 0
    },
    priceMax:{
        type: Number,
        required: 'priceMax is required'
    },
    dateInit:{
        type: Date,
        required: true
    },
    dateEnd:{
        type: Date,
        required: true
    },
    explorerId:{
        type: Schema.Types.ObjectId,
        ref: "Actor",
        required: 'explorer actor id required'
    }
}, { strict: false });

module.exports = mongoose.model('Search', SearchSchema);