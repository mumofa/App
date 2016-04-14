/*账号信息*/
var m_data = {
	/*	 
	 * 账号种类
	 * 学生为0 教师为1
	 * */
	type: 0
}

$(function() {
	/*各种方法汇总*/
	var fn = {
			/*遮罩 loading 展示*/
			showLoading: function(page) {
				page.find(".m-mask").show();
				page.find(".m-loading").show();
			}, //展示 结尾

			/*遮罩 loading 隐藏*/
			hideLoading: function(page) {
				page.find(".m-mask").hide();
				page.find(".m-loading").hide();
			}, //隐藏 结尾
			/*获取公告*/
			getNews: function() {
				$.ajax({
					type: "get",
					url: "http://121.42.183.198/get_news.php",
					//					url: "http://localhost/App/get_news.php",
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "data",
					async: false,
					success: function(data) {
						if (data.code == "0") {
							$("#no_news").hide();
							var str = '';
							for (var i = 0; i < data.comments.length; i++) {
								var obj = eval('(' + data.comments[i] + ')');
								str += '<div class="card news"' + 'data-id=' + obj.id + '>';
								str += '<div class="card-header news-title">' + obj.title + '</div>';
								str += '<div class="card-content">';
								str += '<div class="card-content-inner news-content m-card-ell">' + obj.content + '</div>';
								str += '</div>';
								str += '<div class="card-footer">';
								str += '<div class="news-time">' + obj.time + '</div>';
								str += '<div class="news-user">' + obj.username + '</div>';
								str += '</div>';
								str += '</div>';
							}
							$("#comments-content").html(str);
						} else if (data.code == "1") {
							$("#no_news").show();
						}
					}
				});
			}, //getNews 结尾

			/*上传评论*/
			upComments: function() {
				var des_page = $("#des_page");
				var news_id = des_page.find(".news").attr("data-id");
				var user_id = localStorage.getItem("id");
				var content = des_page.find("#des_input").val();
				$.ajax({
					type: "get",
					url: "http://121.42.183.198/up_comments.php",
					//					url: "http://localhost/App/up_comments.php",
					data: {
						content: content,
						user_id: user_id,
						news_id: news_id
					},
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "data",
					async: false,
					success: function(data) {
						if (data.code == "0") {
							alert(data.msg);
							des_page.find("#des_input").val("");
							setTimeout(fn.getComments(), 0);
						} else {
							alert(data.msg);
						}
					}
				});
			}, //上传评论 结尾

			/*获取评论*/
			getComments: function() {
				var des_page = $("#des_page");
				fn.showLoading(des_page);
				var news_id = des_page.find(".news").attr("data-id");
				$.ajax({
					type: "get",
					url: "http://121.42.183.198/get_comments.php",
					//												url: "http://localhost/App/get_comments.php",
					data: {
						news_id: news_id
					},
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "comments",
					async: false,
					success: function(data) {
						if (data.code == "0") {
							var str = '';
							for (var i = 0; i < data.comments.length; i++) {
								var obj = eval('(' + data.comments[i] + ')');
								str += '<div class="comments-box">';
								str += '<div class="card-content">';
								str += '<div class="card-content-inner comments-content">' + obj.content + '</div>';
								str += '</div>';
								str += '<div class="card-footer">';
								str += '<div class="news-time">' + obj.time + '</div>';
								str += '<div class="comments-user">' + obj.username + '</div>';
								str += '</div>';
								str += '</div>';
							}
							$("#comments_bigbox").show();
							$("#comments_bigbox").html(str);
							$("#des_no_comments").hide();
						} else if (data.code == "1") {
							$("#comments_bigbox").hide();
							$("#des_no_comments").show();
						}
					}, //success 结尾 
					complete: function() {
							fn.hideLoading(des_page);
						} //complete 结尾
				});
			}, //获取评论 结尾

			/*进入公告详情*/
			inCommentsDes: function() {
				var _this = $(this);
				var news = {
					title: _this.find(".news-title").html(),
					content: _this.find(".news-content").html(),
					time: _this.find(".news-time").html(),
					user: _this.find(".news-user").html(),
					id: _this.attr("data-id")
				}
				var des_page = $("#des_page");
				des_page.find(".news-title").html(news.title);
				des_page.find(".news-content").html(news.content);
				des_page.find(".news-time").html(news.time);
				des_page.find(".news-user").html(news.user);
				des_page.find(".news").attr("data-id", news.id);
				$.router.load("#des_page"); //加载内联页面
			}, // 进入评论详情

			/*获取视频信息*/
			getVideo: function(index) {
					var page = $("#video_page");
					var video = page.find("#video");
					//视频地址
					var src_arr = ["http://v4.pstatp.com/ed5a906ae67d2efcd0974d189758d5bb/570602c5/origin/12679/722684996",
						"http://v6.pstatp.com/origin/12553/6898860624?Signature=%2BTp7GNnrAzgfP%2Br6rCohBlNMFlU%3D&Expires=1460015495&KSSAccessKeyId=qh0h9TdcEMrm1VlR2ad/"
					];
					//视频封面
					var pic_arr = ["http://p3.pstatp.com/large/3df00069be5cf3bff0c",
						"http://p3.pstatp.com/large/3e300047bab8a9dd9c3"
					];
					video.attr("src",src_arr[index]).attr("poster",pic_arr[index]);
					$.router.load("#video_page"); //加载内联页面
				} //获取视频信息
		} //fn 结尾

	$(document).on("pageInit", function(e, pageId, $page) {
		$("body").removeClass("with-panel-left-reveal");
		$("#m-panel").removeClass("active").hide();
		$(".m-mask").hide();
	});
	$(document).on("click", ".open-panel", function() {
		$(".m-mask").show();
	});
	$(document).on("click", ".close-panel", function() {
		$(".m-mask").hide();
	});
	$(".list-ul").on("click", "li", function(e) {
		var target = $(e.target);
		var target_parent = target.parent();
		var index = target_parent.index();
		target_parent.addClass("current-li").siblings().removeClass("current-li");
	});

	/*获取公告*/
	$(".btn-refresh").on("click", fn.getNews);

	/*进入公告详情*/
	$("#news_page").on("click", ".news", fn.inCommentsDes);

	/*评论上传*/
	$("#btn_comment").on("click", fn.upComments);

	/*评论刷新*/
	$("#btn_des").on("click", fn.getComments);

	/*进入视频详情*/
	$("#videoList_page").on("click", ".item-input a", function(e) {
		e.stopPropagation();
		var target = $(e.target);
		var target_parent = target.parent().parent().parent().parent();
		var index = target_parent.index();
		fn.getVideo(index);
	});
	
	/*视频返回清空视频信息*/
	$("#video_page").on("click",".m-btn",function(){		
		var page = $("#video_page");
		var video = page.find("#video");
		video.attr("src","").attr("poster","");
	});

	/*事件监听*/
	$(document).on("pageInit", function(e, pageId, $page) {
		if (pageId == "news_page") {
			fn.getNews();
			$("#des_input").val("");
		} else if (pageId == "des_page") {
			fn.getComments();
		}
	});

})