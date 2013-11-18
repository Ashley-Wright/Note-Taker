var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Resource = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  // notes: {type: String},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now}
});

Resource.plugin(uniqueValidator);
mongoose.model('Resource', Resource);