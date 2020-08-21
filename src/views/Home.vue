<template>
  <div class="home">
    <pagesOne v-if="tabIndex == 1" :show.sync="tabIndex" />
    <pagesTwo v-if="tabIndex == 2" :show.sync="tabIndex" />
    <pagesThree v-if="tabIndex == 3" :show.sync="tabIndex" />
    <pagesFour v-if="tabIndex == 4" :show.sync="tabIndex" />
  </div>
</template>
<script>
import pagesOne from "./components/pagesOne.vue";
import pagesTwo from "./components/pagesTwo.vue";
import pagesThree from "./components/pagesThree.vue";
import pagesFour from "./components/pagesFour.vue";
export default {
  name: "Home",
  components: {
    pagesOne,
    pagesTwo,
    pagesThree,
    pagesFour,
  },
  created() {
    // 获取图片
    this.getImgList();
  },
  data() {
    return {
      tabIndex: 2,
    };
  },
  methods: {
    getImgList() {
      let config = {
        url: "/api/v1/categorytest/index/pictureList",
        method: "get",
      };
      this.$ajax(config, {}).then((res) => {
        console.log("请求结果", res);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 750px;
  height: 100vh;
  background-color: #171d26;
  padding: 0px 0px 20px 0px;
  box-sizing: border-box;
  position: relative;
}
</style>
