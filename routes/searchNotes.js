

exports.pdf = function(req,res){
  console.log('----req.body----');
  console.log(req.body);
  doc.text('note1');
  res.send({});
};