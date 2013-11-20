var mongoose = require('mongoose');
var Resource = mongoose.model('Resource');
var Note = mongoose.model('Note');

exports.create = function(req,res){
  req.body.user = res.locals.user;
  new Resource(req.body).save(function(err, resource){
    res.send(resource);
  });
};

exports.show = function(req,res){
  req.session.currentResource = {};
  req.session.notes = [];
  Resource.findById(req.params.id, function(err, resource){
    req.session.currentResource = resource;
    // console.log(resource);
    Note.find({resource: resource.id}, function(err, notes){
      req.session.notes = notes;
      console.log(req.session.notes);
      res.send({resource:resource, notes:notes});
    });
  });
};
