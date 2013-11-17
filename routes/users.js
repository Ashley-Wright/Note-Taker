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

exports.login = function(req,res){
  User.findOne({name: req.body.name}, function(err, user){
    if(user){
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if(result){
          req.session.regenerate(function(err){
            req.session.userId = user.id;
            req.session.save(function(err){
              res.send({status: 'ok', name: req.body.name});
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
};

exports.logout = function(req,res){
  req.session.destroy(function(err){
    res.send({status: 'ok'});
  });
};