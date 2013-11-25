var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

exports.create = function(req,res){
  var user = new User();
  user.username = req.body.username;
  console.log('---req.body---');
  console.log(req.body);

  bcrypt.hash(req.body.password, 8, function(err, hash){
    user.password = hash;
    user.save(function(err, user){
      if(err){
        // console.log('---error---');
        // console.log(err);
        res.send({status: 'error'});
      }
      else{
        res.send({status: 'ok'});
      }
    });
  });
}

exports.login = function(req,res){
  console.log(req.body);
  res.send({});
}