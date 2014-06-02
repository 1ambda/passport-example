var express = require('express');
var home = express.Router();

home.use(function(req, res, next) {
  // middle ware
  next();
});

home.get('/', function(req, res) {
  res.render('home');
});


module.exports = home;
