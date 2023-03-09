var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/User.js');
var Album = require('../models/Album.js');

var CancionSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    pertenece: {
        type: Schema.ObjectId,
        ref: 'Album',

        // type: String,
        required: true

    },
    duracion: {
        type: Number,
        required: true
    },
    autor: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    generoMusical: {
        type: String,
        required: true
    }
    ,
    colabora: [{
        type: Schema.ObjectId,
        ref: 'User',
        default: null
    }]
});

module.exports = mongoose.model('Cancion', CancionSchema);
