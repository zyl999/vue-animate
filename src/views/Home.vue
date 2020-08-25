<template>
	<div class="home">
		<pagesOne v-if="tabIndex == 1" :show.sync="tabIndex" />
		<pagesTwo v-if="tabIndex == 2" :show.sync="tabIndex" />
		<pagesThree v-if="tabIndex == 3" :choosedList="choosedList" :show.sync="tabIndex" />
		<pagesFour v-if="tabIndex == 4" :show.sync="tabIndex" :pladFormId="pladFormId" />
	</div>
</template>
<script>
import wx from "weixin-js-sdk";
import Bus from "../utils/bus";
import pagesOne from "./components/pagesOne.vue";
import pagesTwo from "./components/pagesTwo.vue";
import pagesThree from "./components/pagesThree.vue";
import pagesFour from "./components/pagesFour.vue";
import { setToken } from "../utils/auth";
import store from "../utils/storage";

export default {
	name: "Home",
	components: {
		pagesOne,
		pagesTwo,
		pagesThree,
		pagesFour,
	},
	data() {
		return {
			tabIndex: 1,
			someList: [], //测试图片
			choosedList: [], // 喜欢不喜欢勾选的值
			pladFormId: 3, //来源 4代表小程序
		};
	},
	mounted() {
		Bus.$on("getParams", (data) => {
			this.choosedList = data;
		});
		//获取地址栏的值
		let data = window.location.search.substr(1);
		data = decodeURIComponent(data);
		let dataArr = data.split("&");
		if (dataArr[0] != "") {
			let __dealDataArr = [];
			dataArr.forEach((item) => {
				let obj = {};
				obj.key = item.split("=")[0];
				obj.value = item.split("=")[1];
				__dealDataArr.push(obj);
			});
			console.log(__dealDataArr, "获取数组");
			// 获取token
			// let token = 'abd876ad3f6a4108fbd26a27decffca6'
			let token = __dealDataArr.filter((v) => {
				return v.key == "token";
			});
			if (token && token.length > 0) {
				setToken(token[0].value);
			}
			// 获取场景 pladFormId
			let pladFormId = __dealDataArr.filter((v) => {
				return v.key == "pladFormId";
			});
			if (pladFormId && pladFormId.length > 0) {
				this.pladFormId = pladFormId[0].value;
			}
			store.set("a", JSON.stringify(__dealDataArr));
			store.set("pladFormId", this.pladFormId);
			return;
		}
		setToken("");
		store.set("pladFormId", this.pladFormId);
	},
	methods: {},
};
</script>
<style lang="scss">
@import "../font/font.css";
.home {
	width: 750px;
	height: 100vh;
	background-color: #171d26;
	padding: 0px 0px 20px 0px;
	box-sizing: border-box;
	position: relative;
}
</style>
