var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');
var db = mongoose.connection;

// POST de un nuevo usuario
router.post('/', function(req, res, next) {
  User.create(req.body, function(err, user) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
    });
});

// GET de un único usuario por su nombre de usuario
router.get('/:usuario', function(req, res, next) {
  User.findOne({'usuario': req.params.usuario}, function(err, user) {
    if (err) res.status(500).send(err);
    else res.status(200).json(user);
  });
});

// Listado de los seguidos de un usuario
router.get('/:usuario/listado_seguidos', function(req, res, next) {
  User.find().populate("seguidos", {
    _id:0,
    usuario:1
  })
})

// GET del listado de usuarios ordenados por fecha de registro
router.get('/', function(req, res, next) {
  User.find().sort('fechaRegistro').exec(function(err, users) {
    if (err) res.status(500).send(err);
    else res.status(200).json(users);
  });
});

// PUT (actualizar) de un usuario existente identificado por su nombre de usuario
router.put('/:usuario', function(req, res, next) {
  User.findOneAndUpdate({'usuario': req.params.usuario}, req.body, function(err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE de un usuario existente identificado por su nombre de usuario
router.delete('/:usuario', function(req, res, next) {
  User.findOneAndDelete({'usuario':req.params.usuario}, function(err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// Comprueba si el usuario existe
router.post('/signin', function(req, res, next) {
  User.findOne({ usuario: req.body.usuario }, function(err, user) {
    if (err) res.status(500).send('¡Error comprobando el usuario!');
    // Si el usuario existe...
    if (user != null) {
      user.comparePassword(req.body.password, function(err, isMatch) {
      if (err) return next(err);
  
      // Si el password es correcto...
      if (isMatch)
        res.status(200).send({ message: 'ok'});
      else
        res.status(200).send({ message: 'la password nocoincide' });
      });
    } else res.status(401).send({ message: 'usuario no registrado'});
  });
});

module.exports = router;