let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

require('dotenv').config();

// let indexRouter = require('./routes/index');
// let usersRouter = require('./routes/users');
let bodyparser = require('body-parser');
let userModel = require('./models/User');
let songtModel = require('./models/Cancion');
let albumModel = require('./models/Album');
let playListModel = require('./models/Playlist');
let usersRouter = require('./routes/users');
let albumsRouter = require('./routes/albunes');
let songsRouter = require('./routes/canciones');
let playlistRouter = require('./routes/playLists');

let mongoose = require('mongoose');
mongoose.set('strictQuery', false); //requerido para quitar el warning
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

mongoose.connection;

let app = express();

const { body, validationResult } = require('express-validator');
const Playlist = require('./models/Playlist');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/albunes', albumsRouter);
app.use('/songs', songsRouter);
app.use('/playlist', playlistRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Validaciones de la colleción Playlist
app.post(
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

    Playlist.create({
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

module.exports = app;