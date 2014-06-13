var env = process.env.NODE_ENV || 'development',
    path = require('path'),
    rootDir = path.dirname(require.main.filename),
    config = require(rootDir + '/app/config/config')[env];

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    OAuth2Strategy = require('passport-oauth2').Strategy,
    OpenknowlStrategy =
      require(rootDir + '/app/lib/passport-openknowl').Strategy,
    FACEBOOK_APP_ID = config.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET = config.FACEBOOK_APP_SECRET,
    FACEBOOK_CALLBACK_URL = config.FACEBOOK_CALLBACK_URL,
    OPENKNOWL_AUTHORIZATION_URL = config.OPENKNOWL_AUTHORIZATION_URL,
    OPENKNOWL_TOKEN_URL = config.OPENKNOWL_TOKEN_URL,
    OPENKNOWL_APP_ID = config.OPENKNOWL_APP_ID,
    OPENKNOWL_APP_SECRET = config.OPENKNOWL_APP_SECRET,
    OPENKNOWL_CALLBACK_URL = config.OPENKNOWL_CALLBACK_URL;

var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function() {
  'use strict';

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    User.findById(user._id, function (err, user) {
      done(err, user);
    });
  });
  
  passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password'
  }, function(id, password, done) {
    User.findOne({ id: id }, function(err, user) {

      if (err) {
	err.statusCode = 500;
	return done(err);
      }

      if (!user) {
	return done(null, false, {
	  message : 'Not Registered : ' + id
	});
      }

      user.verifyPassword(password , function(err, isMatch) {
	if (err) {
	  err.statusCode = 500;
	  return done(err);
	}

	if (!isMatch) {
	  return done(null, false, { message: 'Invalid Password'});
	} else {
	  return done(null, user);
	}
      });
    });
  }));

  // Facebook Strategy
  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL
    
  }, function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      id: profile.id,
      email: profile.id,
      provider: 'facebook'
    }, function(err, user) {
      return done(err, user);
    });
  }));

  // OpenknowlStrategy
  passport.use(new OpenknowlStrategy({
    clientID: OPENKNOWL_APP_ID,
    clientSecret: OPENKNOWL_APP_SECRET,
    callbackURL: OPENKNOWL_CALLBACK_URL
  }, function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      id: profile.id,
      email: profile.id,
      provider: profile.provider
    }, function(err, user) {
      return done(err, user);
    });
  }));

};
