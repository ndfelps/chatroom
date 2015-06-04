$(document).on('ready', start)

function start() {
	var routerConfig = {
		routes: {
			"chat1": "nav1",
			"chat2": "nav2",
			"chat3": "nav3",
			"chat4": "nav4"
		},
		nav1: function() {
			$('.page').hide();
			$('#chatArea1').show();
		},
		nav2: function() {
			$('.page').hide();
			$('#chatArea2').show();
		},
		nav3: function() {
			$('.page').hide();
			$('#chatArea3').show();
		},
		nav4: function() {
			$('.page').hide();
			$('#chatArea4').show();
		}
	}

	var app = Backbone.Router.extend(routerConfig);
	var myRouter = new app();
	Backbone.history.start();

	$('.btn').on('click', messSub);
	$('#username').on('keyup', messSubPush);
	$('#message').on('keyup', messSubPush);
	var $username = $("#username");
	var $message = $("#message");
	getMess();

	function messSub(e) {
		if($("#username").val() === '' || $("#message").val() === '') {

		} else {
			var myMessage = {
				name: $("#username").val(),
				message: $("#message").val(),
				ch: window.location.hash
			}

			$.post(
				'http://tiny-pizza-server.herokuapp.com/collections/theWaitresses/',
				myMessage
			);
		}
	}
	function messSubPush(e) {
		if($("#username").val() === '' || $("#message").val() === '') {

		} else if(event.keyCode === 13) {
				var myMessage = {
					name: $("#username").val(),
					message: $("#message").val(),
					ch: window.location.hash
				}

				$.post(
					'http://tiny-pizza-server.herokuapp.com/collections/theWaitresses/',
					myMessage
				);
				$('#message').val('');
			}
	}

	function getMess() {
		$.get(
			'http://tiny-pizza-server.herokuapp.com/collections/theWaitresses/',
			onMessagesReceived,
			'json'
		);
	}
	setInterval(getMess, 500);

	function onMessagesReceived(val) {
		$(window.location.hash).html('');
			for (var i = val.length; i>0; --i) {
				if(window.location.hash === val[i-1].ch)
					$(window.location.hash).append('<div>' + val[i-1].name + ': ' + val[i-1].message + '</div>')
			}
	}
}