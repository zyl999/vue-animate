import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tabIdx: 1,
	},
	mutations: {
		stTabIdx(state, payload) {
			state.tabIdx = payload;
			// uni.setStorageSync(platform() + ':' + 'UserInfo', info_str)
		},
	},
	getters: {
		getTabIdx(state) {
			return state.tabIdx;
		},
	},
	actions: {},
	modules: {},
});
