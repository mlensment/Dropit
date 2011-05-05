var express = require('express'),
    nowjs = require('now');
	
//server creating 
var app = express.createServer(); 
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});
app.listen(80); 
var everyone = nowjs.initialize(app); 
everyone.now.distributeMessage = function(message){ 
	console.log(this.now.name)
	everyone.now.receiveMessage(this.now.name, message);
}
