
/*
 * GET dataview page.
 */

var fs = require('fs');
var filename = './jsondata/Activities.json';
var runningData;















function getData(){
	
	fs.readFile(filename, 'utf8', function (err, data) {
	  if (err) {
//		  throw err;
		  console.log('Activites.json does not exist');
	} else {
	  runningData = JSON.parse(data);
//	  console.log(runningData);
	  console.log('All done');
	}
	});
}
try{
getData();
} catch(err){
	console.log('Activites.json does not exist');
}

exports.display = function(req, res){
	getData();
  res.render('dataview', { 
	  title: 'Data View', 
	  runningData : runningData,
	  
	
  	  });
  };
  
