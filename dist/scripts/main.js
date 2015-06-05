$(document).on('ready', start)

function start() {
	var routerConfig = {
		routes: {
			"": 'login',
			'login': 'login',
			"1": "nav1",
			"2": "nav2",
			"3": "nav3",
			"4": "nav4",
			"leaderboard": "nav5",
			"settings": "nav6"
		},
		login: function() {
			$('.page').hide();
			$('#loginPage').show();
			$('#message').hide();
			$('#username').hide();
			$('.btn').hide();
			$('.con').removeClass('active');
			if(user === '' || user === undefined) {
				$('#loginArea').show();
				$('#signOut').hide();
			} else {
				$('#loginArea').hide()
				$('#signOut').show();
			}
		},
		nav1: function() {
			$('.page').hide();
			$('#chatArea1').show();
			$('#message').show();
			$('#username').show();
			$('.btn').show();
			$('.con').removeClass('active');
			$('#ch1').addClass('active');
		},
		nav2: function() {
			$('.page').hide();
			$('#chatArea2').show();
			$('#message').show();
			$('#username').show();
			$('.btn').show();
			$('.con').removeClass('active');
			$('#ch2').addClass('active');
		},
		nav3: function() {
			$('.page').hide();
			$('#chatArea3').show();
			$('#message').show();
			$('#username').show();
			$('.btn').show();
			$('.con').removeClass('active');
			$('#ch3').addClass('active');
		},
		nav4: function() {
			$('.page').hide();
			$('#chatArea4').show();
			$('#message').show();
			$('#username').show();
			$('.btn').show();
			$('.con').removeClass('active');
			$('#ch4').addClass('active');
		},
		nav5: function() {
			// $('.page').hide();
			// $('#message').hide();
			// $('#username').hide();
			// $('.btn').hide();
			// $('.con').removeClass('active');
			// $('#leaderboard').show();
		},
		nav6: function() {
			$('.page').hide();
			$('#message').hide();
			$('#username').hide();
			$('.btn').hide();
			$('.con').removeClass('active');
			$('#settings').show();
		}
	}

	var app = Backbone.Router.extend(routerConfig);
	var myRouter = new app();
	Backbone.history.start();

	$('.btn').on('click', messSub);
	$('#username').on('keyup', messSubPush);
	$('#message').on('keyup', messSubPush);

	$('#loginBox').on('keyup', signInPush);
	$('#signIn').click(signIn);

	$('#signOut').click(logOut);

	var $message = $("#message");
	var user = '';
	getMess();

	function signIn () {
		console.log('3');
		if($('#loginBox').val() !== '') {
			console.log('?');
			user = $('#loginBox').val();
			$('#loginBox').val('');
			$('#loginArea').hide();
			$('#signOut').show();
		}

	}

	function signInPush () {
		if(event.keyCode === 13) {
			console.log('g');
			if($('#loginBox').val() !== '') {
				user = $('#loginBox').val();
				$('#loginBox').val('');
				$('#loginArea').hide();
				$('#signOut').show();
			}
		}
	}

	function logOut() {
		user = '';
		$('#loginArea').show();
		$('#signOut').hide();
	}

	function messSub(e) {
		if(user === '' || user === undefined) {
			window.location.hash = '#login';
		} else if($("#message").val() === '') {

			} else {
				myMessage = {
					name: user,
					message: $("#message").val(),
					badge: (window.location.hash).substring(1)
				}

				$.post(
					'https://morning-reef-8611.herokuapp.com/trainers',
					myMessage
				);
				$('#message').val('');
			}
	}
	function messSubPush(e) {
	if($("#message").val() === '') {

		} else if(event.keyCode === 13) {
			if(user === '' || user === undefined) {
			window.location.hash = '#login';
			} else {
					myMessage = {
						name: user,
						message: $("#message").val(),
						badge: (window.location.hash).substring(1)
					}

					$.post(
						'https://morning-reef-8611.herokuapp.com/trainers',
						myMessage
					);
					$('#message').val('');
				}
			}
	}

	function getMess() {
		$.get(
			'https://morning-reef-8611.herokuapp.com/trainers',
			onMessagesReceived,
			'json'
		);
	}
	setInterval(getMess, 500);

	function onMessagesReceived(val) {
		if(window.location.hash === '#1' || window.location.hash === '#2' || window.location.hash === '#3' || window.location.hash === '#4') {
			$(window.location.hash).html('');
			for (var i = val.length; i>0; --i) {
				if(window.location.hash === ('#'+val[i-1].badge)) {
					$(window.location.hash).append('<div>' + val[i-1].name + ': ' + val[i-1].message + '</div>')
				}
			}
		}
	}
}