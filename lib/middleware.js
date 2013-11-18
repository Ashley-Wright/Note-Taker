var mongoose = require('mongoose');
var User = mongoose.model('User');
var Resource = mongoose.model('Resource');

exports.findUser = function(req, res, next){
  if(req.session.userId){
    User.findById(req.session.userId, function(err, user){
      if(user){
        res.locals.user = user;
        next();
      }
    });
  } else {
    next();
  }
};

exports.getResources = function(req, res, next){
  if(res.locals.user){
    Resource.find({user: res.locals.user}, function(err, resources){
      res.locals.resources = resources;
      next();
    });
  } else {
    res.locals.resources = [];
    next();
  }
};