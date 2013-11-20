var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');

var Note = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  resource: {type: mongoose.Schema.Types.ObjectId, ref: 'Resource'},
  createdAt: {type: Date, default: Date.now}
});

Note.plugin(textSearch);
Note.index({"$**": "text"}, {name: "TextIndex"});

mongoose.model('Note', Note);