var mongoose = require('mongoose');

var Source = mongoose.Schema({
  title: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Source', Source);