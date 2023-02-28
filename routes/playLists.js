var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const { routes } = require('../app');
var playlist = require('../models/Playlist');
var db = mongoose.connection;
const { body, validationResult } = require('express-validator');

// GET de una única playlist por su Id 
router.get('/:nombre', function (req, res, next) {
  playlist.find(req.params.nombre, function (err, playlist) {
    if (err) res.status(500).send(err);
    else res.status(200).json(playlist);
  });
});

// GET del listado de usuarios ordenados por fecha de registro
router.get('/', function(req, res, next) {
  playlist.find().sort('num_seguidores').exec(function(err, playlist) {
    if (err) res.status(500).send(err);
    else res.status(200).json(playlist);
  });
});

// POST de una nueva playlist 
router.post('/', function (req, res, next) {
  playlist.create(req.body, function (err, playlist) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// PUT de una playlist existente identificado por su Id 
router.put('/:id', function (req, res, next) {
  playlist.findByIdAndUpdate(req.params.id, req.body, function (err, playlist) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE de una playlist existente identificado por su Id 
router.delete('/:id', function (req, res, next) {
  playlist.findByIdAndDelete(req.params.id, function (err, playlist) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// GET del listado de posts ordenados por fecha de publicación 
router.get('/ordenados', function (req, res, next) {
  playlist.find().sort('publicatedate').populate('nombre').populate('canciones', {
    _id: 0,
    nombre: 1
  }).exec(function (err, playlist) {
    if (err) res.status(500).send(err);
    else res.status(200).json(playlist);
  });
});

// Validaciones de la colleción Playlist
router.post(
  '/playlist',
  // El nombre debe ser de tipo String
  body('nombre').isString(),
  // La longitud del creador debe ser mínimo 5
  body('creador').isLength({min: 5}),
  // Num_canciones debe ser de tipo Numeric
  body('num_canciones').isNumeric(),
  // Canciones debe ser un Array de canciones
  body('canciones').isArray(),
  // Descripcion debe ser de tipo String
  body('descripcion').isString(),
  // Num_seguidores debe ser de tipo Numeric
  body('num_seguidores').isNumeric(),
  // FechaDeCreacion debe ser de tipo Date
  body('fechaDeCreacion').isDate(),

  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    playlist.create({
      nombre: req.body.nombre,
      creador: req.body.creador,
      num_canciones: req.body.num_canciones,
      canciones: req.body.canciones,
      descripcion: req.body.descripcion,
      num_seguidores: req.body.num_seguidores,
      fechaDeCreacion: req.body.fechaDeCreacion,
    }).then(playlist => res.json(playlist));
  },
);

module.exports = router;