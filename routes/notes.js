var mongoose = require('mongoose');
var Note = mongoose.model('Note');

exports.create = function(req,res){
  req.body.source = req.session.currentSource._id;
  new Note(req.body).save(function(err, note){
    res.send(note);
  });
};