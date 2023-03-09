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
// router.get('/:album', function (req, res, next) {
//   Song.find({ 'album': req.params.pertenece }).exec(function (err, cancion) {
//     if (err) res.status(500).send(err);
//     else res.status(200).json(cancion);
//   });
// });

// POST de un nuevo cancion
router.post('/', function (req, res, next) {
  Song.create(req.body, function (err, cancion) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

router.post('/',
  body('titulo').exists().isString(),
  body('pertenece').exists().isMongoId(),
  body('duracion').exists().isNumeric(),
  body('autor').exists().isMongoId(),
  body('creationDate').optional().isDate(),
  body('generoMusical').exists().isString(),
  body('colabora').optional().isArray().custom((value, { req }) => {
    for (let i = 0; i < value.length; i++) {
      if (!mongoose.Types.ObjectId.isValid(value[i])) {
        throw new Error(`Valor no válido en el índice ${i} de colabora`);
      }
    }
    return true;
  }),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Cancion.create({
      titulo: req.body.titulo,
      pertenece: req.body.pertenece,
      duracion: req.body.duracion,
      autor: req.body.autor,
      creationDate: req.body.creationDate,
      generoMusical: req.body.generoMusical,
      colabora: req.body.colabora,
    }).then(cancion => res.json(cancion));
  }
);






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