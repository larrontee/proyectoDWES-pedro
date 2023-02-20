var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Song = require('../models/Cancion');
var db = mongoose.connection;

// GET del listado de las canciones
router.get('/', function (req, res, next) {
  Song.find().exec(function (err, canciones) {
    if (err) res.status(500).send(err);
    else res.status(200).json(canciones);
  })
});


// GET de las canciones por su titulo
router.get('/:titulo', function (req, res, next) {
  Song.find({ 'titulo': req.params.titulo }).exec(function (err, cancion) {
    if (err) res.status(500).send(err);
    else res.status(200).json(cancion);
  });
});
// GET de las canciones por su titulo
router.get('/:album', function (req, res, next) {
  Song.find({ 'album': req.params.pertenece }).exec(function (err, cancion) {
    if (err) res.status(500).send(err);
    else res.status(200).json(cancion);
  });
});

// POST de un nuevo cancion
router.post('/', function (req, res, next) {
  Song.create(req.body, function (err, cancion) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// PUT (actualizar) de una cancion segun su album y su titulo
router.put('/:album/:titulo', function (req, res, next) {
  Song.findOneAndUpdate({ 'album': req.params.pertenece, 'titulo': req.params.titulo, }, req.body, function (err, songinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE de una cancion segun su album y su titulo
router.delete('/:album/:titulo', function (req, res, next) {
  Song.findOneAndDelete({ 'album': req.params.pertenece, 'titulo': req.params.titulo, }, function (err, songinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});


module.exports = router;