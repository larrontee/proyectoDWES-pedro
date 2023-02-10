var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Album = require('../models/Album')
var db = mongoose.connection;
/* GET users listing. */
router.get('/', function(req, res, next) {
  Album.find().sort('-fechaDeCreacion').exec(function(err, albums) {
    if (err) res.status(500).send(err);
    else res.status(200).json(albums);
  });
});
router.get('/searchbyseguidores', function(req, res, next) {
  Album.find().sort('-numeroSeguidores').exec(function(err, albums) {
    if(err) res.status(500).send(err);
    else res.status(200).json(albums);
  });
});
router.get('/:nombre', function(req, res, next) {
  console.log("asd");
  Album.findOne({nombre: req.params.nombre}, function(err, albums) {
    if(err) res.status(500).send(err);
    else res.status(200).json(albums);
  });
});
router.post('/', function(req, res, next) {
  Album.create(req.body, function(err, userinfo) {
    if(err)res.status(500).send(err);
    else res.sendStatus(200);
  });
});
router.delete('/:id', function(req, res, next) {
  Album.findByIdAndDelete(req.params.id, function (err, userinfo) {
    if(err)res.status(500).send(err);
    else res.sendStatus(200);
  });
});
module.exports = router;