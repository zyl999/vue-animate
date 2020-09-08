<template>
  <div class="home">
    <pagesOne v-if="tabIndex == 1" :show.sync="tabIndex" />
    <pagesTwo v-if="tabIndex == 2" :show.sync="tabIndex" />
    <pagesThree v-if="tabIndex == 3" :choosedList="choosedList" :show.sync="tabIndex" />
    <pagesFour v-if="tabIndex == 4" :show.sync="tabIndex" :pladFormId="pladFormId" />
    <empty v-if="tabIndex == 5" :show.sync="tabIndex" :pladFormId="pladFormId" />
  </div>
</template>
<script>
import wx from "weixin-js-sdk";
import Bus from "../utils/bus";
import pagesOne from "./components/pagesOne.vue";
import pagesTwo from "./components/pagesTwo.vue";
import pagesThree from "./components/pagesThree.vue";
import pagesFour from "./components/pagesFour.vue";
import empty from "./components/empty.vue";
import { setToken } from "../utils/auth";
import store from "../utils/storage";
import { api_getTestResult } from "../api";

export default {
  name: "Home",
  components: {
    pagesOne,
    pagesTwo,
    pagesThree,
    pagesFour,
    empty,
  },
  data() {
    return {
      tabIndex: 0,
      someList: [], //测试图片
      choosedList: [], // 喜欢不喜欢勾选的值
      pladFormId: 3, //来源 4代表小程序
    };
  },
  created() {
    // this.tabIndex = 1;
    this.$store.commit("stTabIdx", 1);
    // alert("初始化");
  },
  mounted() {
    Bus.$on("getParams", (data) => {
      this.choosedList = data;
    });
    setToken(""); //先清空token值
    store.set("pladFormId", -1);
    //获取地址栏的值
    let data = window.location.search.substr(1);
    data = decodeURIComponent(data);
    console.log("data", data);
    if (data) {
      // 携带参数
      let dataArr = data.split("&");
      let __dealDataArr = [];
      dataArr.forEach((item) => {
        let obj = {};
        obj.key = item.split("=")[0];
        obj.value = item.split("=")[1];
        __dealDataArr.push(obj);
      });
      console.log(__dealDataArr, "获取数组");
      // 获取token
      let token = __dealDataArr.filter((v) => {
        return v.key == "token";
      });
      if (token && token.length > 0) {
        setToken(token[0].value);
        // 有token 去请求是否已有测试结果
        this.getResult();
      } else {
        // 有参数无token 默认第一页
        this.tabIndex = 1;
      }
      // 获取场景 pladFormId 4为小程序
      let pladFormId = __dealDataArr.filter((v) => {
        return v.key == "pladFormId";
      });
      if (pladFormId && pladFormId.length > 0) {
        this.pladFormId = pladFormId[0].value;
      }
      store.set("a", JSON.stringify(__dealDataArr));
      store.set("pladFormId", this.pladFormId);
    } else {
      // 未携带参数
      this.tabIndex = 1;
    }
  },
  methods: {
    getResult() {
      this.$ajax(api_getTestResult, {})
        .then((res) => {
          console.log("测试结果", res);
          if (res.code == 200) {
            this.result = res.result;
            if (this.result && this.result.explanation) {
              // 已有测试结果
              this.tabIndex = 4;
            } else {
              // 没有测试结果
              this.tabIndex = 1;
            }
          }
        })
        .catch((err) => {
          this.tabIndex = 1;
        });
    },
  },
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
