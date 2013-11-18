var mongoose = require('mongoose');
var Resource = mongoose.model('Resource');

exports.create = function(req,res){
  req.body.user = res.locals.user;
  new Resource(req.body).save(function(err, resource){
    res.send(resource);
  });
};

exports.show = function(req,res){
  req.session.currentResource = {};
  Resource.findById(req.params.id, function(err, resource){
    req.session.currentResource = resource;
    // console.log(req.session.currentResource);
    res.send(resource);
  });
};