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
    // 测试结果
    this.text();
  },
  data() {
    return {
      tabIndex: 4,
      someList: [], //测试图片
    };
  },
  methods: {
    text() {
      let config = {
        url: "/api/v1/categorytest/index/computeScore",
        method: "post",
      };
      let data = {
        result: [
          { type_id: "1", like_nums: 1, dis_like_nums: 1 },
          { type_id: "2", like_nums: 1, dis_like_nums: 1 },
          { type_id: "3", like_nums: 1, dis_like_nums: 1 },
          { type_id: "4", like_nums: 1, dis_like_nums: 1 },
          { type_id: "5", like_nums: 1, dis_like_nums: 1 },
          { type_id: "6", like_nums: 1, dis_like_nums: 1 },
          { type_id: "7", like_nums: 1, dis_like_nums: 1 },
          { type_id: "8", like_nums: 1, dis_like_nums: 1 },
          { type_id: "9", like_nums: 1, dis_like_nums: 1 },
          { type_id: "10", like_nums: 2, dis_like_nums: 0 },
        ],
      };
      this.$ajax(config, data).then((res) => {
        console.log("计算得分", res);
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
