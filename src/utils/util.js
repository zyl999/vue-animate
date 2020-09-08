// ios,安卓交互公共方法
const jsBridgeApp = (methodName, data, cb) => {
	let isAndroid = navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1;
	let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	try {
		// const res = uni.getSystemInfoSync();
		// ios
		if (isiOS) {
			window.webkit.messageHandlers[methodName].postMessage(data);
		} else {
      // 安卓
      // alert(1111)
			window.WebViewJavascriptBridge.callHandler(methodName, data, cb ? cb() : null); 
		}
	} catch (e) {}
};
module.exports = jsBridgeApp;
