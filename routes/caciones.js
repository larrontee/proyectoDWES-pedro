var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


router.get('/', function (req, res, next) {
  User.find().sort('').exec(function (err, users) {
    if (err) res.status(500).send(err);
    else res.status(200).json(users);
  });
});