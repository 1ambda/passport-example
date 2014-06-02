var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required : true },
  createdDate: { type: Date, default: Date.now }
});

UserSchema.statics.create = function(params, cb) {
  var User = this;

  (new User(params)).save(cb);
};

UserSchema.statics.getAll = function(cb) {
  var User = this;

  User.find({}, cb);
};

UserSchema.statics.getById = function(userId, cb) {
  var User = this;

  User.findOne({ id: userId }, cb);
};

mongoose.model('User', UserSchema);
