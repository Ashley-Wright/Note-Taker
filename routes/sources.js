var mongoose = require('mongoose');
var Source = mongoose.model('Source');
var __ = require('lodash');

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
  console.log(req.body);
  req.session.currentSource = {};
  Source.findById(req.params.id, function(err, source){
    req.session.currentSource = source;
    res.send({});
  });
}