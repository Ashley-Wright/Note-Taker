exports.index = function(req, res){
  if(req.session.currentResource){
    res.locals.currentResource = req.session.currentResource;
  } else {
    res.locals.currentResource = null;
  }
  res.render('home/index', {title: 'Express', user: res.locals.user, resources: res.locals.resources, currentResource: res.locals.currentResource});
};
