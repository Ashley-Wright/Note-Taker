var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var User = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
});

User.plugin(uniqueValidator);
mongoose.model('User', User);
