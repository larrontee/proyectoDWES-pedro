const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {body, validationResult} = require('express-validator');
const app = express();
require('dotenv').config();

let bodyparser = require('body-parser');
let userModel = require('./models/User');
let songtModel = require('./models/Cancion');
let albumModel = require('./models/Album');
let playListModel = require('./models/Playlist');
let usersRouter = require('./routes/users');
let albumsRouter = require('./routes/albunes');
let songsRouter = require('./routes/canciones');
let playlistRouter = require('./routes/playLists');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); //requerido para quitar el warning
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/albunes', albumsRouter);
app.use('/songs', songsRouter);
app.use('/playlist', playlistRouter);

app.get('/', (req, res) => {
  res.render('index');
});

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;