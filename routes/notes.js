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