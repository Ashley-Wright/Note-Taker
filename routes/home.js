
exports.index = function(req, res){
  if(req.session.currentSource){
    res.locals.currentSource = req.session.currentSource;
  } else {
    res.locals.currentSource = null;
  }
  res.render('home/index', {title: 'Express', user: res.locals.user, sources: res.locals.sources});
};
