var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 11;

var UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required : true },
  createdDate: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {

  var user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
	return next(err);
      }

      user.password = hash;
      next();
    });
  });
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

UserSchema.methods.verifyPassword = function(candidatePassword, cb) {

  var password = this.password;
  
  bcrypt.compare(candidatePassword, password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
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
