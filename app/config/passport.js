var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function() {
  'use strict';

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
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
};
