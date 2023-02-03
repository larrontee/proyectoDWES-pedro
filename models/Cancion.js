var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/User.js');

var CancionSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    duracion: {
        type: Number,
        required: true
    },
    fullname: String,
    autor: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    generoMusical: {
        type: String,
        required: true
    },
    colabora: [{
        type: Schema.ObjectId,
        ref: 'User',
        default: null
    }]
});

module.exports = mongoose.model('Cancion', CancionSchema);
