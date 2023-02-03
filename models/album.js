var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user.js');
var AlbumSchema = new Schema({
    nombre:{
        type:String,
        required: true
    },
    autor:{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    numeroCanciones:{
        type:Number,
        required: true
    },
    descripcion:{
        type:String,
        required:false
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
module.exports = mongoose.model('album', AlbumSchema);