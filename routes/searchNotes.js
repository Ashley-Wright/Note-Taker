
exports.index = function(req,res){
  req.session.currentSource = null;
  res.send({});
}