$(document).on('ready', start)

function start() {
	var routerConfig = {
		routes: {
			"": 'welcome',
		}
	}

	$('.btn').on('click', messSubmit)
	var $username = $("#username");
	var $message = $("#message");

	function messSubmit(e) {

		var myMessage = {
			username: $username.val(),
			text: $message.val()
		}

		$.post(
			'http://tiny-pizza-server.herokuapp.com/collections/theWaitresses/',
			myMessage
		);
		console.log("ugh");
		console.log(myMessage.message)
	}

	function getMessages() {
		$.get(
			'http://tiny-pizza-server.herokuapp.com/collections/theWaitresses/',
			onMessagesReceived,
			'json'
		);
	}
}