var express = require('express'),
    oauthApi = express.Router(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

oauthApi.use(function(req, res, next) {
  // middlewares
  next();
});

module.exports = oauthApi;
