var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cancion = require('../models/Cancion.js');
var User = require('../models/User.js');
var AlbumSchema = new Schema({
    nombre:{
        type:String,
        required: true
    },
    autor:[{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }],
    numeroCanciones:{
        type:Number,
        required: true
    },
    canciones:[{
        type:Schema.ObjectId,
        ref: 'Cancion',
        required: true
    }],
    descripcion:{
        type:String
    },
    numeroSeguidores:{
        type:Number,
        default:0,
        required: true
    },
    fechaDeCreacion:{
        type:Date,
        default: Date.now,
        required:true
    }
});
module.exports = mongoose.model('Album', AlbumSchema);
