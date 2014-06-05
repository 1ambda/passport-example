var express = require('express'),
    rootApi = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

rootApi.use(function(req, res, next) {
  // middle ware
  next();
});

rootApi.get('/', function(req, res) {

  if (req.session.authorized) {
    res.render('welcome');
  } else {
    res.render('home');
  }
});

rootApi.post('/login', function(req, res) {
  if (req.session.authorized) {
    return res.send(200);
  }
});

rootApi.post('/loginBareApi', function(req, res) {

  if (req.session.authorized) {
    return res.send(200);
  }

  var user = {
    id: req.body.id,
    password: req.body.password
  };

  User.login(user, function(err) {
    if (err) {
      console.log(err);
      return res.send(err.httpStatus | 500, err.message);
    }
    req.session.authorized = true;
    req.session.userId = user.id;
    res.send(200, 'Authorized');
  });
});

rootApi.get('/logout', function(req, res) {

  req.session.destroy(function(err) {
    res.send(200, 'Successfully Logout');
  });
});

module.exports = rootApi;
