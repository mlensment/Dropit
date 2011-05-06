var Main = new function(){
	var self = this;
	this.start = function(){
		if(window.location.hash == ''){
			var picId = new Date().getTime();
			window.location.hash = '!/' + picId;
		}else{
			this.picLookup();
		}
		$(window).bind('hashchange', function(){
			self.picLookup();
		});
	}
	
	this.picLookup = function(){
		now.picLookup(window.location.hash.match(/\d+$/), function(url){
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