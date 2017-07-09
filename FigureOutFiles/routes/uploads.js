
/*
 * GET upload page.
 */

exports.display = function(req, res){
  res.render('uploads', { title: 'Uploads' });
};