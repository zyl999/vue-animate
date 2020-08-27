<template>
  <div class="content">
    <span>风格测试结果正在生成...</span>
    <nprogress
      :h="h"
      :w="npgressW"
      bgc="rgba(255, 255, 255, 0.8)"
      parentBgc="rgba(245,245,245,.2)"
      sec="2s"
      :radius="true"
    />
  </div>
</template>
<script>
import nprogress from "./nprogress.vue";
import { api_getTestData } from "../../api";

export default {
  components: {
    nprogress,
  },
  props: {
    choosedList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      h: 10,
      npgressW: "0%",
    };
  },
  created() {
    document.title = "风格测试";
  },
  mounted() {
    setTimeout(() => {
      this.npgressW = "100%";
    }, 500);
    this.test(this.choosedList);
  },
  methods: {
    test(data) {
      console.log("data", data);
      let dislikeArr = data.filter((item) => {
        return item.dis_like_nums == 2;
      });
      console.log("dislikeArr", dislikeArr);
      if (dislikeArr.length >= 10) {
        // 都为不喜欢
        setTimeout((_) => {
          this.$emit("update:show", 5);
        }, 2000);
        return;
      }
      this.$ajax(api_getTestData, { result: data }).then((res) => {
        console.log("测试", res);
        if (res.code == 200) {
          setTimeout((_) => {
            this.$emit("update:show", 4);
          }, 2000);
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
  // overflow: hidden;
}
</style>
