var mongoose = require('mongoose');
var Note = mongoose.model('Note');


exports.create = function(req,res){
  req.body.resource = req.session.currentResource._id;
  console.log(req.body);
  new Note(req.body).save(function(err, resource){
    console.log(resource);
    res.send(resource);
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