var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var playlist = require('../models/Playlist');
var db = mongoose.connection;

// GET de una única playlist por su Id 
router.get('/:id', function (req, res, next) {
  playlist.findById(req.params.id, function (err, playlist) {
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
router.get('/', function (req, res, next) {
  Post.find().sort('-publicationdate').populate('nombre').populate('canciones', {
    _id: 0,
    nombre: 1
  }).exec(function (err, playlist) {
    if (err) res.status(500).send(err);
    else res.status(200).json(playlist);
  });
});

module.exports = router;