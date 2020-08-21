<template>
  <div class="content">
    <span>风格测试结果正在生成...</span>
    <nprogress
      :h="10"
      :w="npgressW"
      bgc="rgba(255, 255, 255, 0.8)"
      parentBgc="rgba(245,245,245,.2)"
      sec="2s"
    />
  </div>
</template>
<script>
import nprogress from "./nprogress.vue";
export default {
  components: {
    nprogress,
  },
  data() {
    return {
      npgressW: "0%",
    };
  },
  mounted() {
    setTimeout(() => {
      this.npgressW = "100%";
    }, 1000);
    this.test();
  },
  methods: {
    test() {
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
        console.log("测试", res);
        if (res.code == 200) {
          this.$emit("update:show", 4);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  span {
    font-size: 26px;
    font-family: "PingFangSC-Regular,PingFang SC";
    color: #ffffff;
    margin-bottom: 60px;
  }
  height: 100px;
  width: 488px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
</style>
