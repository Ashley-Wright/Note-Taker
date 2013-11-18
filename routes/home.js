exports.index = function(req, res){
  res.render('home/index', {title: 'Express', user: res.locals.user, resources: res.locals.resources});
};
