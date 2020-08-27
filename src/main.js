import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import storage from "./utils/storage";
import "lib-flexible";
import "./style/index.scss";
import { ajax } from "./http";
import echarts from "echarts";
// import Bridge from "./utils/JSbridge.js";
// Vue.prototype.$bridge = Bridge;
Vue.prototype.$echarts = echarts;
Vue.prototype.$ajax = ajax;

Vue.config.productionTip = false;
// 判断当前设备
let isAndroid = navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1;
let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
console.log("isAndroid", isAndroid, isiOS);
// 判断设备
storage.set("device", isAndroid);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
