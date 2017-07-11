
/*
 * GET dataview page.
 */
exports.display = function(req, res){
  res.render('dataview', { title: 'Data View' });
};