var Main = new function(){
	var self = this;
	this.start = function(){
		var name = prompt('What is your name?');
		now.name = name;
		$('button#nupp').live('click', function(){
			now.distributeMessage($('input').val());
		});
	}
	
	now.receiveMessage = function(username, message){
		$('div#messages').append('<span style="font-weight:bold;">' + username + '<span> ' + message + '<br />');
	}
}
$(document).ready(function(){
	Main.start();
});
