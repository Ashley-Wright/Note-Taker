exports.index = function(req, res){
  if(req.session.currentResource){
    res.locals.currentResource = req.session.currentResource;
  } else {
    res.locals.currentResource = null;
  }
  console.log('home index')
  console.log(req.session.notes);
  res.render('home/index', {title: 'Express', user: res.locals.user, resources: res.locals.resources, currentResource: res.locals.currentResource, notes: req.session.notes});
};

