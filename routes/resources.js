var mongoose = require('mongoose');
var Resource = mongoose.model('Resource');

exports.create = function(req,res){
  req.body.user = res.locals.user;
  new Resource(req.body).save(function(err, resource){
    res.send(resource);
  });
};