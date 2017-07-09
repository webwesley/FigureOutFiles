
/**
 * Module dependencies.
 */

/*jshint esversion: 6 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , upload = require("express-fileupload")
  , fs = require('fs')
  , uploads = require('./routes/uploads')
  , csv = require('csvtojson');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload());
app.use('/uplods', uploads);

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/uploads', uploads.display);


app.post("/uploads", function(req, res) {
	if(req.files){
//		console.log(req.files);
		var file = req.files.filename,
			filename = file.name;
//		console.log(file);
		console.log(filename);
		console.log(file.path);
		
				
		fs.rename(file.path, "./upload/"+filename, function(err){
			if(err){
				console.log(err);
				res.send("error occured");
			} else {
				const csvFilePath='./upload/' + filename; //converts the csv data to json data
				var content = '';
				csv()
				.fromFile(csvFilePath)
				.on('json',(jsonObj)=>{
				    // combine csv header row and csv line to a json object 
				    // jsonObj.a ==> 1 or 4 
					content += JSON.stringify(jsonObj) + '/n'; //writes out json data
				}) 
				.on('done',(error)=>{
					if(error){
						console.log(err);
					} else {
						
						fs.writeFile("./jsondata/" + filename.replace('.csv', '.json'), content, 'utf8', function (err) {
						    if (err) {
						        return console.log(err);
						    }

						    console.log("The file was saved!");
						}); 
					}
					
				  	});
				
			

				res.send("Done!");
			}
		});
		
		
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



