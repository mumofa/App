//取消浏览器的所有事件，使得active的样式在手机上正常生效
document.addEventListener('touchstart', function() {
	return false;
}, true);
// 禁止选择
document.oncontextmenu = function() {
	return false;
};
// H5 plus事件处理
function plusReady() {
	switch (plus.os.name) {
		case "Android":
			// 程序全局环境对象
			mainActivity = plus.android.runtimeMainActivity();
			// 导入AlertDialog类
			AlertDialog = plus.android.importClass("android.app.AlertDialog");
			break;
		case "iOS":
			// 导入UIAlertView类
			UIAlertView = plus.ios.importClass("UIAlertView");
			break;
		default:
			break;
	}
}
if (window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}