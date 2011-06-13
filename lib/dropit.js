var pg = require('pg'),
    nowjs = require('now'),
    sha256 = require(__dirname + '/../public/js/sha'),
    conString = 'pg://postgres:martinl@localhost/dropit_db';
    
var Dropit = function(app){
  this.app = app;
  this.everyone = nowjs.initialize(app);
  this.main();
  this.route();
  this.client = new pg.Client(conString);
  this.client.connect();
};

Dropit.prototype.main = function(){
  var that = this;
  this.everyone.now.inputText = function(params, callback){
    that.client.query("INSERT INTO content (type, content, title) VALUES (1, '" + params.inputText + "', '" + params.titleText + "') RETURNING id", function(err, result){
      if(err){
        callback(false);
        return;
      }
      callback(true, result.rows[0].id);
    });
  };
  
  this.everyone.now.loadContent = function(itemId, callback){
    if(!itemId){
      var query = "SELECT * FROM content";
    }else if(!isNaN(itemId)){
      var query = "SELECT * FROM content WHERE id = '" + itemId + "'";
    }else{
      that.everyone.now.notice({type: 'error', value: 'ID saab olla ainult numbriline!'});
      return;
    }
    
    that.client.query(query, function(err, result){
      if(err){
        that.everyone.now.notice({type: 'error', value: 'Päring ebaõnnestus!'});
        return;
      }
      callback(result.rows);
    });
  };
};

Dropit.prototype.route = function(){
  this.app.get('/', function(req, res){
    res.render('layout');
  });
};

module.exports.start = function(app){ return new Dropit(app) };