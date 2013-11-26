var mongoose = require('mongoose');
var Note = mongoose.model('Note');

exports.sort = function(req,res){
  console.log('-----req.body-----');
  // console.log(req.body.sortedNotes);
  for(var i = 0; i < req.body.sortedNotes.length; i++){
    // console.log(req.body.sortedNotes[i].replace(/"/g, ""));
    var id = req.body.sortedNotes[i].replace(/"/g, "");
    Note.findByIdAndUpdate(id, {position: i}, function(err, note){
      console.log(note);
    })
  }
  res.send({});
};