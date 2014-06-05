var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required : true },
  createdDate: { type: Date, default: Date.now }
});

UserSchema.statics.create = function(params, cb) {
  var User = this;

  User.find({id : params.id }, function(err, result) {
    if (err) {
      err.httpStatus = 500;
      return cb(err);
      
    } else if (result.length) {
      var error = new Error('Already Registered');
      error.httpStatus = 409;
      return cb(error);
      
    } else {
      (new User(params)).save(cb);
    }
  });
};

UserSchema.statics.getAll = function(cb) {
  var User = this;

  User.find({}, cb);
};

UserSchema.statics.getById = function(userId, cb) {
  var User = this;

  User.findOne({ id: userId }, cb);
};

UserSchema.statics.login = function(params, cb) {

  this.find(params, function(err, result) {
    
    if (err) {
      err.httpStatus = 500;
      return cb(error);
      
    } else if (!result.length) {
      var error = new Error('Not Registered or Password Incorrect');
      error.httpStatus = 401;
      return cb(error);
      
    } else {
      return cb();
    }
  });
};

mongoose.model('User', UserSchema);
