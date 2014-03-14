var mongoose = require('mongoose');
var Note = mongoose.model('Note');

exports.create = function(req,res){
  req.body.source = req.session.currentSource._id;
  req.body.user = res.locals.user._id;

  new Note(req.body).save(function(err, note){
    res.send(note);
  });
};

exports.search = function(req,res){
  var search = req.query.search;
  req.session.searchTerm = search;
  req.session.searchResults = [];
  req.session.sortedSearchResults = [];

  Note.textSearch(search, function(err, output){

    if(output){
      for(var i = 0; i < output.results.length; i++){
        if(String(output.results[i].obj.user) == String(res.locals.user._id)){
          req.session.searchResults.push(output.results[i])
        }
      }
      res.send(req.session.searchResults);
    }
  });
}