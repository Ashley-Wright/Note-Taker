var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

exports.create = function(req,res){
  var user = new User();
  user.username = req.body.username;

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
  User.findOne({username: req.body.username}, function(err, user){
    if(user){
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if(result){
          req.session.regenerate(function(err){
            req.session.userId = user.id;
            req.session.save(function(err){
              res.send({status: 'ok', username: req.body.username});
            });
          });
        } else {
          req.session.destroy(function(err){
            res.send({status: 'error'});
          });
        }
      });
    } else {
      res.send({status: 'error'});
    }
  });
}

exports.logout = function(req,res){
  req.session.destroy(function(err){
    res.send({status: 'ok'});
  });
};