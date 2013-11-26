var mongoose = require('mongoose');
var Source = mongoose.model('Source');
var __ = require('lodash');
var Note = mongoose.model('Note');

exports.create = function(req,res){
  req.body.user = res.locals.user;

  // Test to make sure all source titles are unique within a user's account
  Source.find({user: req.body.user}, function(err,sources){
    var sourceTitles = [];
    if(sources){
      console.log('sources');
      console.log(sources);
      for(var i = 0; i < sources.length; i++){
        sourceTitles.push(sources[i].title);
      }
    }
    var contains = __.contains(sourceTitles, req.body.title);
    if(contains){
      res.send({status:'error'});
    } else {
      new Source(req.body).save(function(err, resource){
        res.send(resource);
      });
    }
  });
}

exports.show = function(req,res){
  req.session.currentSource = {};
  req.session.notes = [];
  Source.findById(req.params.id, function(err, source){
    req.session.currentSource = source;
    Note.find({source: source.id}, function(err, notes){
      console.log('source.show');
      // filter out notes without a position property
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
      // sort notes with position property by position
      sortedNotes = __.indexBy(sortedNotes, 'position');
      // indexBy returns an object, need to convert to array
      sortedNotes = __.values(sortedNotes);

      // add notes without position property to notes with position
      for(i = 0; i < unsortedNotes.length; i++){
        sortedNotes.push(unsortedNotes[i]);
      }

      req.session.notes = sortedNotes;
      console.log(req.session.notes);
      res.send({source:source, notes:sortedNotes});
    });
  });
}