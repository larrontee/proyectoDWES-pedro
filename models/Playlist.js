var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cancion = require('../models/Cancion.js');
var User = require('../models/User.js');

var playlistSchema = new Schema({
    nombre:{
        type:String,
        required: true
    },
    creador:{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    num_canciones:{
        type:Number,
        required: true
    },
    canciones:[{
        type:Schema.ObjectId,
        ref: 'Cancion'
    }],
    descripcion:{
        type:String
    },
    num_seguidores:{
        type:Number,
        default:0
    },
    fechaDeCreacion:{
        type:Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Playlist', playlistSchema);
