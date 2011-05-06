var express = require('express'),
    nowjs = require('now'),
	fs = require('fs');
	
var app = express.createServer(); 
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});
app.listen(80); 

var everyone = nowjs.initialize(app); 
everyone.now.picLookup = function(id, callback){
	var db = JSON.parse(fs.readFileSync('db/db.json'));
	for(var i in db.picture){
		console.log(db.picture[i].id)
		 if(db.picture[i].id == id){
			callback(db.picture[i].url);
			return;
		}
	}
	callback(null);
}