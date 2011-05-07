var express = require('express'),
    nowjs = require('now'),
	fs = require('fs');
	
var app = express.createServer(); 
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});
app.listen(80); 

var everyone = nowjs.initialize(app); 
everyone.now.imgLookup = function(id, callback){
	fs.readFile('db/db.json', function(err, data){
		if(err)
			throw err;
		var db = JSON.parse(data);
		for(var i in db.picture){
			if(db.picture[i].id == id){
				callback(db.picture[i].url);
				return;
			}
		}
		callback(null);
	});
}

everyone.now.saveImage = function(id, url, callback){
	fs.readFile('db/db.json', function(err, data){
		if(err)
			throw err;
		var db = JSON.parse(data);
		db.picture.push({id: id, url: url});
		var newDb = JSON.stringify(db);
		fs.writeFile('db/db.json', newDb, encoding='utf8', function(err){
			if(err){
				callback(false);
				throw err;
			}
			callback(true);
		});
	});
}