var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playlist = new Schema({
    id_playlist:{
        type:Number,
        required: true
    },
    nombre:[{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }],
    creador:{
        type:Number,
        required: true
    },
    num_canciones:[{
        type:Schema.ObjectId,
        ref: 'Cancion',
        required: true
    }],
    descripcion:{
        type:String,
        required:false
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
module.exports = mongoose.model('Playlist', playlist);