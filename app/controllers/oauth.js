var express = require('express'),
    oauthApi = express.Router(),
    mongoose = require('mongoose');

var passport = require('passport');

oauthApi.use(function(req, res, next) {
  // middlewares
  next();
});

oauthApi.get('/facebook', passport.authenticate('facebook'));
oauthApi.get('/facebook/callback',
	       passport.authenticate('facebook', {
		 successRedirect: '/',
		 failureRedirect: '/'}));

oauthApi.get('/openknowl', passport.authenticate('openknowl'));
oauthApi.get('/openknowl/callback',
	       passport.authenticate('openknowl', {
		 successRedirect: '/',
		 failureRedirect: '/'}));

// oauthApi.get('/openknowl/callback', function(req, res) {
//   console.log(req.query);
// });

module.exports = oauthApi;
