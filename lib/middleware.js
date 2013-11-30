var mongoose = require('mongoose');
var User = mongoose.model('User');
var Source = mongoose.model('Source');
var Note = mongoose.model('Note');
var __ = require('lodash');

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
      // console.log(res.locals.sources);
      next();
    });
  } else {
    res.locals.sources = [];
    next();
  }
};

exports.getNotes = function(req,res, next){
  // console.log('req session');
  // console.log(req.session.currentSource);

  if(req.session.currentSource){
    console.log(req.session.currentSource._id);
    Note.find({source: req.session.currentSource._id}, function(err, notes){
      console.log('callback from database')
      // console.log(notes);
      if(notes){
        var sortedNotes = [];
        var unsortedNotes = [];
        for(var i = 0; i < notes.length; i++){
          var hasPosition = notes[i].position !== undefined;
          if(hasPosition){
            sortedNotes.push(notes[i]);
          } else {
            unsortedNotes.push(notes[i]);
          }
        }
        sortedNotes = __.indexBy(sortedNotes, 'position');
        sortedNotes = __.values(sortedNotes);
        for(i = 0; i < unsortedNotes.length; i++){
          sortedNotes.push(unsortedNotes[i]);
        }
        req.session.notes = sortedNotes;
        next();
      } else {
        req.session.notes = [];
        next();
      }
    });
  } else {
    next();
  }
}