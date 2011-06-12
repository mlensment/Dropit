var Dropit = function(){
  this.listen();
  this.app();
};

Dropit.start = function(){ return new Dropit(); };

Dropit.prototype.init = function(){
  now.loadContent(false, function(data){
    $('#main').html('');
    for(var i in data){
      var title = data[i].title || 'Pealkiri puudub';
      $('#main').prepend('<a href="#!/item/' + data[i].id + '">' + title + '</a><br />');
    }
  });
};

Dropit.prototype.listen = function(){
  $('#toggleInput').live('click', function(){
    $('#input').toggle(); 
  });
};

Dropit.prototype.app = function(){
  var that = this;
  Sammy(function(){
    this.post('#!/inputText', function(){
      var that = this;
      now.inputText(this.params, function(result, rowId){
        if(result){
          $('#noticeText').addClass('noticeSuccess').html('Kirje edukalt lisatud!').show();
          var title = that.params['titleText']  || 'Pealkiri puudub';
          //$('#main').prepend('<a href="#!/item/' + rowId + '">' + title + '</a><br />');
          $('#inputText')[0].reset();
          $('#input').toggle();
          window.location = '#!/item/' + rowId;
        }else{
          $('#noticeText').addClass('noticeError').html('Kirje lisamisel tekkis viga!').show();
        }
      });
    });
    
    this.get('#!/item/:id', function(){
      now.loadContent(this.params['id'], function(data){
        var title = data[0].title  || 'Pealkiri puudub';
        $('#main').html('<table><tr><td>Pealkiri: </td><td>' + title + '</tr><tr><td>Sisu: </td><td>' + data[0].content + '</td></tr></table>');
      });
    });
    
    this.get('', function(){
      that.init();
    });
    
    this.get('#!', function(){
      that.init();
    });
    this.run();
  });
};

now.notice = function(data){
  $('#noticeText').removeClass();
  if(data.type == 'error'){
    $('#noticeText').addClass('noticeError').html(data.value).show();
  }else{
    $('#noticeText').addClass('noticeSuccess').html(data.value).show();
  }
};

$(document).ready(function(){
  now.ready(function(){
    Dropit.start();
  });
});