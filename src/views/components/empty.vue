<template>
  <div class="content">
    <div class="wrap">
      <img src="../../assets/empty.png" alt />
      <span>测试无果，请重新测试</span>
      <div class="button" @click="reTest">重新测试</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    choosedList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  created() {
    document.title = "测试结果";
  },
  mounted() {},
  methods: {
    reTest() {
      this.$emit("update:show", 2);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100vh;
  .wrap {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
    // border: 1px solid red;
  }
  img {
    width: 200px;
    height: 224px;
  }
  span {
    font-size: 30px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-top: 20px;
    margin-bottom: 80px;
  }
  .button {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
    width: 200px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    background: #ff3047;
    border-radius: 36px;
  }
}
</style>
