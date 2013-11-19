var mongoose = require('mongoose');
var User = mongoose.model('User');
var Resource = mongoose.model('Resource');
var Note = mongoose.model('Note');
var async = require('async');
var m = require('../lib/mechanics');

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

// exports.findResource = function(req, res, next){
//   if(req.session)

//   console.log('find resource');
//   console.log(req.session.currentResource);
//   next();
// }

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

// exports.getNotes = function(req,res, next){
//   console.log('req session');
//   console.log(req.session.currentResource);
//   if(req.session.currentResource){
//     console.log(req.session.currentResource._id);
//     Note.find({resource: req.session.currentResource._id}, function(err, notes){
//       console.log('callback from database')
//       console.log(notes);
//       if(notes){
//         res.locals.notes = notes;
//       } else {
//         res.locals.notes = [];
//       }
//     });
//   }
//   console.log('res locals');
//   console.log(res.locals.notes);
//   next();
// }



// exports.getNotes = function(req,res, next){
//   async.waterfall([
//     function(fn){if(req.session.currentResource){m.findNotes(req.session.currentResource,fn);}else{},
//     function(res.locals.notes,fn){next();}
//   ]);
// }