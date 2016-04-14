$(function() {
	/*正则验证*/
	var test = {
		username: /^[a-zA-Z0-9]{6,16}$/i,
		password: /^\w{6,16}$/,
		name: /[\u4e00-\u9fa5]/gm
	}

	var fn = {
		/*登录事件*/
		login: function() {
			/*获取登录种类*/
			var login_type = type.find("input:checked").val();
			/*账号*/
			var user = $("#login-user").val();
			/*密码*/
			var password = $("#login-password").val();

			if (user != '' && password != '') {
				$.ajax({
					type: "get",
									url: "http://121.42.183.198/login.php",
//					url: "http://localhost/App/login.php",
					data: {
						type: login_type,
						user: user,
						password: password
					},
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "data",
					async: true,
					success: function(data) {
						if (data.code == "0") {
							alert("登录成功");
							localStorage.setItem("id",data.uid);
							localStorage.setItem("name",data.name);
							window.location.href = "index.html";
						} else {
							alert(data.msg);
						}
					}
				});

			} else {
				alert("用户名与密码不能为空");
			}


		},
		/*注册事件*/
		register: function() {
			/*账号*/
			var user = $("#register-user").val();
			/*姓名*/
			var name = $("#register-name").val();
			/*密码*/
			var password = $("#register-password").val();
			/*再次密码*/
			var password_again = $("#register-password-again").val();

			if (user != '' && name != '' && password != '' && password_again != '') {
				if (test.username.test(user)) {
					if (test.password.test(password)) {
						if (password == password_again) {
							$.ajax({
								type: "get",
															url: "http://121.42.183.198/register.php",
//								url: "http://localhost/App/register.php",
								data: {
									user: user,
									name: name,
									password: password,
									password_again: password_again
								},
								dataType: "jsonp",
								jsonp: "callback",
								jsonpCallback: "data",
								async: true,
								success: function(data) {
									if (data.code == "0") {
										alert("注册成功");
										$.router.load("#login-page");
									} else {
										alert(data.msg);
									}
								}
							});

						} else {
							alert("密码输入不一致");
						}
					} else {
						alert("请按要求填写密码,输入6-16位字符，可由英文、数字、下划线组成");
					}
				} else {
					alert("请按要求填写账号,输入6-16位字符，可由英文、数字组成");
				}
			} else {
				alert("不能为空");
			}

		}


	}

	/*登录按钮*/
	var btn_login = $(".btn-login");
	/*注册按钮*/
	var btn_register = $(".btn-register");
	/*清除按钮*/
	var btn_clear = $(".btn-clear");
	/*登录种类*/
	var type = $(".m-type");

	/*登录事件*/
	btn_login.on("click", fn.login );

	/*注册事件*/
	btn_register.on("click", fn.register );

	/*返回事件*/
	btn_clear.on("click", function() {
		/*账号*/
		$("#register-user").val("");
		/*姓名*/
		$("#register-name").val("");
		/*密码*/
		$("#register-password").val("");
		/*再次密码*/
		$("#register-password-again").val("");
		/*账号*/
		$("#login-user").val("");
		/*密码*/
		$("#login-password").val("");
	})

})