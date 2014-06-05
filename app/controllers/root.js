var express = require('express'),
    rootApi = express.Router(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

rootApi.use(function(req, res, next) {
  // middle ware
  next();
});

rootApi.get('/', function(req, res) {

  if (req.session.passport.user) {
    res.render('welcome');
  } else {
    res.render('home');
  }
});

rootApi.post('/login', function(req, res, next) {
  if (req.session.passport.user) {
    return res.send(200);
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.send(err.statusCode || 500, err);
    }

    if (!user) {
      return res.send(400, info.message);
    }

    req.logIn(user, function(err) {
      if (err) {
	return res.send(500, err);
      }

      res.send(200);
    });
  })(req, res, next);

});

rootApi.get('/logout', function(req, res) {

  req.session.destroy(function(err) {
    res.send(200, 'Successfully Logout');
  });
});

module.exports = rootApi;
