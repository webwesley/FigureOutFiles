
/*
 * GET dataview page.
 */
/*jshint esversion: 6 */

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

//	try{
//		sendYUnits = units.get(yAxis);
//		sendXUnits = units.get(xAxis);
//		console.log(sendYUnits);
//		console.log(sendXUnits);
//	} catch(err) {
//		console.log('x and y axis are not defined yet');
//	}
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
  
