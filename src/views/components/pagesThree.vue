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
    setTimeout(() => {
      this.$emit("update:show", 4);
    }, 3000);
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
