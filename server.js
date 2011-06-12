var express = require('express')
    dropit = require(__dirname + '/lib/dropit');
	
var app = express.createServer(); 
app.configure(function(){
  app.use(express.cookieParser());
  app.use(express.session({secret: '38wieojdkf9yi3kwe;s.'}));
	app.use(express.static(__dirname + '/public'));
});
app.listen(80); 

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
dropit.start(app);