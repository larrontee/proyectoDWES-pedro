var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');
var db = mongoose.connection;

/* GET users listing. */

router.get('/', function(req, res, next) {
  User.find().sort('-creationdate').exec(function(err, users) {
    if (err) res.status(500).send(err);
    else res.status(200).json(users);
  });
});
router.post('/', function(req, res, next) {
  User.create(req.body, function(err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});
router.delete('/:id', function(req, res, next) {
  User.findByIdAndDelete(req.params.id, function(err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});
module.exports = router;