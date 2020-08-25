export default function initHandel() {
	var u = navigator.userAgent;
	window.isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
	window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

	window.jsbridge = function(callback) {
		if (window.WebViewJavascriptBridge) {
			return callback(WebViewJavascriptBridge);
		} else {
			document.addEventListener(
				"WebViewJavascriptBridgeReady",
				function() {
					callback(WebViewJavascriptBridge);
				},
				false
			);
		}
		if (window.isIOS) {
			// old ios method
			//setTimeout(function () {
			//    if (window.WVJBCallbacks) {
			//        return window.WVJBCallbacks.push(callback);
			//    }
			//}, 500)
			//window.WVJBCallbacks = [callback];
			//var WVJBIframe = document.createElement('iframe');
			//WVJBIframe.style.display = 'none';
			//WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
			//document.documentElement.appendChild(WVJBIframe);
			//setTimeout(function () {
			//    document.documentElement.removeChild(WVJBIframe)
			//}, 0)

			// new ios method
			if (window.WKWebViewJavascriptBridge) {
				return callback(WKWebViewJavascriptBridge);
			}
			if (window.WKWVJBCallbacks) {
				return window.WKWVJBCallbacks.push(callback);
			}
			window.WKWVJBCallbacks = [callback];
			window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null);
		}
	};

	if (!window.isIOS) {
		jsbridge(function(bridge) {
			bridge.init(function(message, responseCallback) {
				var data = {};
				responseCallback(data);
			});
		});
	}

	/**
	 * @param  {option对象}
	 * method: 调用的方法
	 * data: 传递的参数
	 * callback: 回掉方法
	 * @return {[type]}
	 */
	function bridgeCallHandler(option) {
		// alert(option.method)
		jsbridge(function(bridge) {
			bridge.callHandler(option.method, option.data || {}, function(responseData) {
				if (option.callback) {
					option.callback(responseData);
				}
			});
		});
	}

	//原生调js
	window.bridgeRegisterHandler = function(option) {
		// alert(option.method);
		jsbridge(function(bridge) {
			bridge.registerHandler(option.method, function(data, responseCallback) {
				if (option.callback) {
					option.callback(data);
				}
				responseCallback(option.data || {});
			});
		});
	};

	/**
	 * 传入的option对象格式
	 * {
	 *    method:[String],
	 *    data:[Object],
	 *    callback:[Function]
	 * }
	 */
	window.callNativePage = function(option) {
		bridgeCallHandler({
			method: "callNativePage",
			data: option.data,
			callback: function(responseData) {
				if (option.callback) {
					option.callback(responseData);
				}
			},
		});
	};
}
