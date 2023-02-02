let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Post = require('../models/Post.js');

//Para la encriptación del password
let bcrypt = require('bcryptjs');
let SALT_WORK_FACTOR = 10;
let esquemaUsuario = new Schema({
    usuario: {
        type: String,
        required: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    tipo: {
        type: String,
        enum: ['usuario', 'artista'],
        default: 'usuario'
    },
    numSeguidores: {
        type: Number,
        default: 0        
    },
    seguidos: [{
        type: Schema.ObjectId,
        ref: 'User',
        default: null
    }]
});

esquemaUsuario.pre('save', function (next) {
    var user = this;
    // solo aplica una función hash al password si ha sido modificado (o es nuevo)
    if (!user.isModified('password ')) return next();
    // genera la salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // aplica una función hash al password usando la nueva salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // sobrescribe el password escrito con el “hasheado”
            user.password = hash;
            next();
        });
    });
});

esquemaUsuario.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);