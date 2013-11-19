var mongoose = require('mongoose');

var Note = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  resource: {type: mongoose.Schema.Types.ObjectId, ref: 'Resource'},
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Note', Note);