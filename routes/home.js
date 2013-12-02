
exports.index = function(req, res){
  if(req.session.currentSource){
    res.locals.currentSource = req.session.currentSource;
  } else {
    res.locals.currentSource = null;
  }
  res.render('home/index', {title: 'StudyBuddy', user: res.locals.user, sources: res.locals.sources, notes: req.session.notes, searchResults: req.session.searchResults, sortedSearchResults: req.session.sortedSearchResults, searchTerm: req.session.searchTerm});
};
