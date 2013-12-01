var mongoose = require('mongoose');
var Note = mongoose.model('Note');
var PDFDocument = require('pdfkit');

exports.index = function(req,res){
  req.session.currentSource = null;
  res.send({});
}

exports.sort = function(req,res){
  console.log('---req.body---');
  console.log(req.body.sortedNotes);
  req.session.sortedSearchResults = [];

  for(var i = 0; i < req.body.sortedNotes.length; i++){
    var id = req.body.sortedNotes[i].replace(/"/g, "");

    Note.findById(id, function(err, note){
      req.session.sortedSearchResults.push(note);

      if(req.session.sortedSearchResults.length === req.body.sortedNotes.length){
        console.log(req.session.sortedSearchResults);
        res.send({status: 'ok'});
      }
    });
  }
}

exports.pdf = function(req,res){
  doc = new PDFDocument();
  doc.fontSize(20);
  doc.text(req.session.searchTerm);
  doc.moveDown(1);

  if(req.session.sortedSearchResults.length !== 0){
    for(var i = 0; i < req.session.sortedSearchResults.length; i++){
      doc.fontSize(15);
      doc.text(req.session.sortedSearchResults[i].title);
      doc.moveDown(0.5);
      doc.fontSize(12);
      doc.text(req.session.sortedSearchResults[i].content);
      doc.moveDown(2.0);
    }
    doc.output(function(string){
      res.end(string);
    });
  } else if(req.session.searchResults.length !== 0) {
    console.log('---pdf---');
    for(var i = 0; i < req.session.searchResults.length; i++){
      doc.fontSize(15);
      doc.text(req.session.searchResults[i].obj.title);
      doc.moveDown(0.5);
      doc.fontSize(12);
      doc.text(req.session.searchResults[i].obj.content);
      doc.moveDown(2.0);
    }
    doc.output(function(string){
      res.end(string);
    });
  }
  // doc.output(function(string){
  //   res.end(string);
  // });
  //
};