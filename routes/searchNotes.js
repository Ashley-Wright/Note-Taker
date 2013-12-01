var mongoose = require('mongoose');
var Note = mongoose.model('Note');

exports.index = function(req,res){
  req.session.currentSource = null;
  res.send({});
}

exports.sort = function(req,res){
  console.log('---req.body---');
  console.log(req.body.sortedNotes);
  req.session.sortedSearchResults = [];

  for(var i = 0; i < req.body.sortedNotes.length; i++){
    var id = req.body.sortedNotes[i].replace(/"/g, "");

    Note.findById(id, function(err, note){
      req.session.sortedSearchResults.push(note);

      if(req.session.sortedSearchResults.length === req.body.sortedNotes.length){
        console.log(req.session.sortedSearchResults);
        res.send({status: 'ok'});
      }
    });
  }
}