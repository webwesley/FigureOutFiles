/*
 * GET return page.
 */

exports.display = function(req, res){
  res.render('returnpage', { title: 'Return Page' });
};