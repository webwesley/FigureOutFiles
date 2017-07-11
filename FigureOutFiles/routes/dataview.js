
/*
 * GET dataview page.
 */

var data = require('../jsondata/Activities');

exports.display = function(req, res){
  res.render('dataview', { 
	  title: 'Data View', 
	  runningData : data  
  	  });
  };