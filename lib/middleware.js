var mongoose = require('mongoose');
var User = mongoose.model('User');
var Source = mongoose.model('Source');

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

exports.getSources = function(req, res, next){
  res.locals.sources = [];

  if(res.locals.user){
    Source.find({user: res.locals.user}, function(err, sources){
      res.locals.sources = sources;
      console.log(res.locals.sources);
      next();
    });
  } else {
    res.locals.sources = [];
    next();
  }
};