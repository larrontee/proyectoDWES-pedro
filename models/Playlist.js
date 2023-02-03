var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cancion = require('../models/Cancion.js');

var playlistSchema = new Schema({
    nombre:{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    creador:{
        type:Number,
        required: true
    },
    num_canciones:{
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
    num_seguidores:{
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
module.exports = mongoose.model('Playlist', playlistSchema);
