var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

exports.create = function(req,res){
  var user = new User();
  user.name = req.body.name;

  bcrypt.hash(req.body.password, 8, function(err, hash){
    user.password = hash;
    user.save(function(err, user){
      if(err){
        res.send({status: 'error'});
      }
      else{
        res.send({status: 'ok'});
      }
    });
  });
};