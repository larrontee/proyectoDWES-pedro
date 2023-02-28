var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Album = require('../models/Album')
const { body, validationResult } = require('express-validator');
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
router.get('/searchByNombre/:nombre', function(req, res, next) {
  Album.find({nombre: req.params.nombre}, function(err, albums) {
    if(err) res.status(500).send(err);
    else res.status(200).json(albums);
  });
});
router.get('/:id', function(req, res, next) {
  Album.findById(req.params.id, function(err, albums) {
    if(err) res.status(500).send(err);
    else res.status(200).json(albums);
  });
});



router.post('/', 
  body('nombre', 'Este campo debe de ser un nombre.').exists().isString().isLength({min:1}),
  body('autor', 'Este campo debe de ser un array.').exists().isArray({min:1}).custom((a)=>{
    return a.every((b)=>{
      return typeof b === "string";
    })
  }),
  body('numeroCanciones', 'Este campo debe de ser un numero.').exists().isNumeric().custom(a=>a>0),
  body('canciones', 'Este campo debe de ser un array.').exists().isArray({min:1}).custom((a)=>{
    return a.every((b)=>{
      return typeof b === "string";
    })
  }),
  body('descripcion', 'Este campo debe de ser un string.').optional().isString(),
  body('numeroSeguidores', 'Este campo debe de ser un numero.').exists().isNumeric().custom(a=>a>0),
  body('fechaDeCreacion', 'Este campo debe de ser una fecha.').exists().isDate(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }
    Album.create({
      nombre: req.body.nombre,
      autor: req.body.autor,
      numeroCanciones: req.body.numeroCanciones,
      canciones: req.body.canciones,
      descripcion: req.body.descripcion,
      numeroSeguidores: req.body.numeroSeguidores,
      fechaDeCreacion: req.body.fechaDeCreacion
    }).then(Album=>res.json(Album))
});



router.put('/:id', function(req, res, next) {
  Album.findByIdAndUpdate(req.params.id, req.body, function(err,albums){
    if(err)res.status(500).send(err);
    else res.sendStatus(200);
  });
});
router.delete('/:id', function(req, res, next) {
  Album.findByIdAndDelete(req.params.id, function (err, albums) {
    if(err)res.status(500).send(err);
    else res.sendStatus(200);
  });
});
module.exports = router;