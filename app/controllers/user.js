var express = require('express'), 
    userApi = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

userApi.use(function(req, res, next) {
  next();
});

userApi.post('/', function(req, res) {

  var user = {
    id: req.body.id,
    email: req.body.email,
    password: req.body.password
  };

  User.create(user, function(err) {
    if (err) {
      console.log(err);
      return res.send(err.httpStatus || 500, err.message);
    }
    
    res.send(201, 'Successfully Registered');
  });
});

userApi.get('/', function(req, res) {
  User.getAll(function(err, result) {
    if (err) {
      console.log(err);
      return res.send(503);
    }

    res.send(result);
  });
});

userApi.get('/:id', function(req, res) {

  User.getById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
      return res.send(500);
    }

    res.send(200, user);
  });
});

userApi.get('/profile/me', function(req, res) {

  if (!req.session.passport.user) {
    return res.send(401, 'Not Authorized');
  }

  User.findById(req.session.passport.user, function(err, user) {
    if (err) {
      console.log(err);
      return res.send(500);
    }

    res.send(200, { id: user.id });
  });
});

module.exports = userApi;
