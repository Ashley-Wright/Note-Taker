var mongoose = require('mongoose');
var Note = mongoose.model('Note');

exports.create = function(req,res){
  req.body.source = req.session.currentSource._id;
  new Note(req.body).save(function(err, note){
    res.send(note);
  });
};

exports.search = function(req,res){
  var search = req.query.search;
  req.session.searchResults = {};
  Note.textSearch(search, function(err, output){
    req.session.searchResults = output.results;
    res.send(output.results);
  });
}