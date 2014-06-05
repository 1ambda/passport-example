var passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function() {
  'use strict';

  passport.use(new LocalStrategy(function() {
    
  }));
};
