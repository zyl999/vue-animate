import axios from "axios";
import { getToken } from "../utils/auth";
import storage from "../utils/storage";
import wx from "weixin-js-sdk";
import store from "../store";
import jsBridgeApp from "../utils/util.js";
const env = process.env.NODE_ENV;
let baseURL = "";
if (env === "development") {
	// 本地环境
	baseURL = "/api";
} else if (env === "production") {
	// 生产环境
  // baseURL = "https://hj-service.51hejia.com";
  baseURL = "/api";
} else if (env === "test") {
	// 测试环境
	// baseURL = "https://test-api.jbh58.com";
	baseURL = "/api";
}
const createService = (customization) => {
	// 创建axios
	const service = axios.create({ baseURL });
	// 请求拦截
	service.interceptors.request.use(
		(config) => {
			if (customization) {
				config = { ...config, ...customization };
			}
			// 可以在请求头添加token等值!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			// config.headers['Access-Token'] = 'abd876ad3f6a4108fbd26a27decffca6'
			config.headers["Access-Token"] = getToken();
			// config.headers["utmUis"] = "";
			// config.headers["utmContent"] = "";
			// config.headers["utmTerm"] = "";
			// config.headers["utmPlan"] = "";
			// config.headers["utmUnit"] = "";
			// config.headers["utmSucai"] = "";
			// config.headers["source"] = "";
			// config.headers["platformId"] = "4";
			// config.headers["cityId"] = "1";
			return config;
		},
		(error) => {
			Promise.reject(error);
		}
	);
	// 响应拦截
	service.interceptors.response.use(
		(response) => {
			const res = response.data;
			// 可以在该处拦截错误信息，如下：!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			const { code, msg } = res;
			// if ((code && code === 10114) || (status && status === 10114 || status === '40101' || status === '10114')) {
			//   const errorMsg = msg || 'TOKEN已经过期, 请重新登录!'
			//   return Promise.reject(errorMsg)
			// }
			if (code == 406 || code == 401) {
				let getTabIdx = store.getters["getTabIdx"];
				if (getTabIdx == 1) {
				} else {
          let pladFormId = storage.get("pladFormId");
					// alert(pladFormId);
					// token 无效
					if (pladFormId == 4) {
            wx.miniProgram.navigateTo({ url: "/pages/login/login?source=webView" });
            // 百度小程序跳转
            if (/swan\//.test(window.navigator.userAgent) || /^webswan-/.test(window.name)) {  
              swan.webView.redirectTo({url: '/pages_my/mobileLogin/mobileLogin?source=webView'})
            }
					} else {
						// alert('未登录');
						// 返回app的登录页
						jsBridgeApp("webLogin", {});
					}
				}

				return Promise.reject(msg);
			}
			return res;
		},
		(error) => {
			Promise.reject(error);
		}
	);
	return service;
};

const createConfig = (config, data) => {
	const type = config.method === "post" ? "data" : "params";
	const result = {
		method: config.method,
		url: config.url,
	};
	if (data && Object.keys(data).length) {
		result[type] = data;
	}
	return result;
};
/*
 * 封装ajax
 */
const ajaxService = createService();

export function ajax(config, data) {
	return new Promise((resolve, reject) => {
		const _ops = createConfig(config, data);
		ajaxService(_ops)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
