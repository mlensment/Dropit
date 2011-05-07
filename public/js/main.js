var Main = new function(){
	var self = this;
	this.start = function(){
		if(window.location.hash == ''){
			var imgId = new Date().getTime();
			window.location.hash = '!/' + imgId;
		}else{
			this.imgLookup();
		}
		
		$(window).bind('hashchange', function(){
			self.imgLookup();
		});
		
		$('input[name="inputText"]').bind('keypress', function(e){
			if(e.which == 13){
				now.saveImage(window.location.hash.match(/\d+$/)[0], $(this).val(), function(result){
					if(result){
						self.imgLookup();
					}
				});
			}
		});
	}
	
	this.imgLookup = function(){
		now.imgLookup(window.location.hash.match(/\d+$/)[0], function(url){
			if(url == null){
				$('div#imageContainer').html('');
				$('div#addImage').show();
			}else{
				$('div#imageContainer').html('<img src="' + url + '" alt="image" />');
				$('div#addImage').hide();
			}
		});
	}

}
$(document).ready(function(){
	now.ready(function(){
		Main.start();
	});
});