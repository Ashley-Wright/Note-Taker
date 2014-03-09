var mongoose = require('mongoose');
var Note = mongoose.model('Note');

exports.create = function(req,res){
  req.body.source = req.session.currentSource._id;
  req.body.user = res.locals.user._id;

  new Note(req.body).save(function(err, note){
    res.send(note);
  });
};

exports.search = function(req,res){
  var search = req.query.search;
  req.session.searchTerm = search;
  req.session.searchResults = [];
  req.session.sortedSearchResults = [];
  console.log('-----');
  console.log(res.locals.user._id);

  Note.textSearch(search, function(err, output){
    if(output){
      req.session.searchResults = output.results;
      console.log(output);
      res.send(output.results);
    }
  });

  // Note.textSearch(search, function(err, output){
  //   console.log("Text Search");
  //   console.log("res");
  //   console.log(res.locals.user._id);
  //   // console.log(output)
  //   // console.log(output.results)
  //   if(output){
  //     for(var i = 0; i < output.results.length; i++){
  //       console.log("Test for");
  //       console.log("res");
  //       console.log(res.locals.user._id);
  //       console.log(output.results[i].obj.user);
  //       if(output.results[i].obj.user == res.locals.user._id){
  //         console.log("In loop");
  //         console.log(output.results[i]);
  //       }
  //     }
  //     // console.log(output.results);
  //     res.send({});
  //   }
  // });


  // Note.find({user: res.locals.user}, function(err, notes){
  //   for(var i = 0; i < notes.length; i++){
  //     console.log("find users notes")
  //     console.log(notes[i]);
  //   }
  // });

}