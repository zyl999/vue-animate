<template>
  <div class="wrap">
    <!-- 进度条 -->
    <nprogress :h="4" :w="npgressW" bgc="rgba(255, 255, 255, 0.2)" parentBgc="#171d26" />
    <!-- <div class="title"></div> -->
    <div class="block">
       <div class="stack-wrapper">
        <stack
          ref="stack"
          :pages="someList"
          :stackinit="stackinit"
          @progressHandle="progressHandle"
          @change="changeHandel"
          :like.sync="like"
        ></stack>
      </div>
    </div>
    
    <div class="controls">
      <div class="left">
        <div class="button" @click="prev">
          <!-- :class="{
						  fw1: !like && progessPositon > 0.0002,
							fw2: !like && progessPositon > 0.6,
          }"-->
          <img
            src="../../assets/no_like.png"
            alt
            :style="{'transform':!like?scaleTransform:'scale(1)'}"
          />
        </div>
        <span>不喜欢</span>
      </div>
      <div class="left">
        <!-- :style="{ width: like ? radioW + 'px' : '54px' }" -->
        <!-- :class="{
							fw1: like && progessPositon > 0.0002,
							fw2: like && progessPositon > 0.6,
        }"-->
        <div class="button" @click="next">
          <img
            src="../../assets/like.png"
            alt
            :style="{'transform':like?scaleTransform:'scale(1)'}"
          />
        </div>
        <span>喜欢</span>
      </div>
    </div>
  </div>
</template>
<script>
import stack from "./stack.vue";
import nprogress from "./nprogress.vue";
import { api_getImgList } from "../../api";

export default {
  // el: "#stack",
  data() {
    return {
      like: true, //显示喜欢不喜欢的按钮
      npgressW: "0%", //滑动图片的进度
      someList: [], //图片集合
      progessPositon: 0, //h滑动图片的位置
      stackinit: {
        visible: 3,
      },
    };
  },
  props: {
    tabIndex: {
      type: Number,
      default: 2,
    },
  },
  created() {
    document.title = "风格测试";
  },
  mounted() {
    // 获取图片列表
    this.getImgList();
  },
  components: {
    stack,
    nprogress,
  },
  computed: {
    scaleTransform() {
      let temp =
        this.progessPositon > 0 && this.progessPositon < 0.5
          ? 2
          : this.progessPositon * 2 + 1;
      console.log("temp", temp);
      temp = temp > 2 ? 1.8 : temp;
      // console.log("dd", temp);
      return `scale(${temp})`;
    },
  },
  methods: {
    getImgList() {
      this.$ajax(api_getImgList, {}).then((res) => {
        console.log("请求结果", res);
        if (res.code == 200) {
          let result = res.result;
          result.filter((v) => {
            v.progress = 0;
            v.opacity = 1;
          });
          this.someList = result;
        }
      });
    },
    prev() {
      this.$refs.stack.$emit("prev");
    },
    next() {
      this.$refs.stack.$emit("next");
    },
    // 进度条
    progressHandle(pageGress) {
      // 更新进度条
      console.log("进度条", pageGress);
      this.npgressW = pageGress + "%";
      if (pageGress == 100) {
        // 最后一张跳转页面
        this.$emit("update:show", 3);
      }
    },
    // 图片滑动
    changeHandel(label, idx, progess) {
      if (label == "opacity") {
        this.$set(this.someList[idx], label, progess);
        return;
      }
      this.progessPositon = progess; //控制爱心的大小
      if (progess > 0.0001) {
        progess = 1;
      }
      this.$set(this.someList[idx], label, progess);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  height: 100vh;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}
.block{
  width: 100%;
  height: calc(100vh - 220px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.stack-wrapper {
  margin: 0 auto;
  position: relative;
  z-index: 1000;
  width: 620px;
  height: 880px;
  padding: 0;
  list-style: none;
  pointer-events: none;
  // overflow: hidden;
  // border-radius: 20px;
  touch-action: none;
}

.controls {
  // margin-top: 60px;
  display: flex;
  padding: 0px 146px;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .button {
    width: 110px;
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #ffffff;

    img {
      width: 54px;
      // height: 46px;
      height: auto;
      max-width: 100px;
      transition: all 0.5s;
      &.fw1 {
        // width: 74px;
        transform: scale(1.3);
      }
      &.fw2 {
        // width: 100px;
        transform: scale(1.5);
      }
      &.f3 {
        width: 54px;
      }
    }
  }

  span {
    margin-top: 20px;
    font-family: "PingFangSC-Regular,PingFang SC";
    font-size: 26px;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
