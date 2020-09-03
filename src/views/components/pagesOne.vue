<template>
  <div class="wrap">
    <div class="block">
      <div class="title">
        <div class="f1">我家适合什么风格？</div>
        <div class="f2">人工智能小虎AI更懂你</div>
      </div>
      <div class="center">
        <img class="img" src="../../assets/login_icon.png" alt />
        <div class="in" v-for="(label, idx) in inArr" :key="inKey[idx]" :class="'in' + idx">
          <i></i>
          <span>{{ label }}</span>
        </div>
        <div class="out" v-for="(label, idx) in outArr" :key="outKey[idx]" :class="'out' + idx">
          <i></i>
          <span>{{ label }}</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="avater">
        <img class="image" :src="item.user_img" alt v-for="(item, idx) in avaterArr" :key="idx" />
      </div>
      <div class="text">
        累计服务
        <span>{{ num }}</span>
        次风格测试
      </div>
      <div class="button">
        <button @click="goTest">开始测试</button>
      </div>
    </div>
  </div>
</template>

<script>
import shortId from "shortid";
import { api_getTestResult, categorytestIndex } from "../../api";
export default {
  props: {
    tabIndex: {
      type: Number,
      default: 2,
    },
  },
  created() {
    // document.title = "风格测试";
    this.$ajax(categorytestIndex, {}).then((res) => {
      console.log("首页数据", res);
      if (res.code == 200) {
        let result = res.result;
        this.num = result.count;
        this.avaterArr = result.list;
      }
    });
  },
  mounted() {
    this.inKey = this.inArr.map((v) => shortId.generate());
    this.outKey = this.outArr.map((v) => shortId.generate());
  },
  data() {
    return {
      num: "",
      result: [],
      avaterArr: [],
      inArr: ["现代极简", "潮流混搭", "欧式豪华", "其他", "日式"],
      outArr: [
        "日式",
        "现代简约",
        "中式现代",
        "工业风",
        "欧式",
        "地中海",
        "现代简约",
        "日式",
        "地中海",
        "美欧风",
        "北欧极简",
      ],
      inKey: [],
      outKey: [],
    };
  },
  methods: {
    // 判断token是否过期
    getResult() {
      this.$ajax(api_getTestResult, {}).then((res) => {
        console.log("测试结果", res);
        if (res.code == 200) {
          this.result = res.result;
          // if (this.result && this.result.explanation) {
          //   this.$emit("update:show", 4);
          // } else {
          //   this.$emit("update:show", 2);
          // }
          this.$emit("update:show", 2);
        }
      });
    },
    goTest() {
      this.$store.commit("stTabIdx", 2);
      this.getResult();
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes myfirst {
  0% {
    background: rgba(255, 166, 176, 1);
    transform: scale(1);
    // transform: scale(0.5);
    // background: #ffffff;
  }
  50% {
    background: rgba(255, 166, 176, 0.5);
    transform: scale(0.5);
    // background: #ffffff;
  }
  100% {
    background: rgba(255, 166, 176, 1);
    transform: scale(1);
    // transform: scale(0.5);
    // background: #ffffff;
  }
}
.wrap {
  padding-top: 100px;
  width: 750px;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  .block{
    width: 100%;
    height: calc(100vh - 400px);
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  }
  .title {
    width: 100%;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .f1 {
      font-size: 44px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: bold;
    }
    .f2 {
      font-size: 28px;
      // font-family: "PingFangSC-Regular, PingFang SC";
      font-family: PingFang SC;
      margin-top: 14px;
      opacity: 0.6;
    }
  }
  .center {
    margin: 80px auto 120px;
    width: 536px;
    height: 534px;
    background-image: url("../../assets/background.png");
    background-repeat: no-repeat;
    background-size: 536px 534px;
    position: relative;
    .img {
      width: 118px;
      height: 124px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .in,
    .out {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      opacity: 0.6;
      i {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        animation: myfirst 1.5s ease infinite normal;
      }
      span {
        margin-top: 6px;
        font-size: 10px;
        font-family: "PingFangSC-Regular,PingFang SC";
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        font-size: 20px;
      }
    }
    .in {
      &.in0 {
        right: 199px;
        top: 121px;
      }
      &.in1 {
        right: 71px;
        top: 264px;
      }
      &.in2 {
        right: 170px;
        bottom: 102px;
      }
      &.in3 {
        left: 146px;
        top: 362px;
      }
      &.in4 {
        left: 106px;
        top: 192px;
      }
    }
    .out {
      &.out0 {
        left: 274px;
        top: 5px;
      }
      &.out1 {
        right: 69px;
        top: 48px;
      }
      &.out2 {
        right: -10px;
        top: 162px;
      }
      &.out3 {
        right: -10px;
        top: 334px;
      }
      &.out4 {
        right: 68px;
        top: 438px;
      }
      &.out5 {
        bottom: -28px;
        left: 282px;
      }
      &.out6 {
        left: 54px;
        bottom: 34px;
      }
      &.out7 {
        left: -18px;
        top: 322px;
      }
      &.out8 {
        left: -24px;
        top: 212px;
      }
      &.out9 {
        left: 26px;
        top: 102px;
      }
      &.out10 {
        left: 115px;
        top: 22px;
      }
    }
  }
  .bottom {
    .avater {
      width: 400px;
      // border: 1px solid red;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .image {
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 1);
        box-sizing: border-box;
        display: block;
        margin-left: -6px;
      }
    }
    .text {
      font-family: "PingFangSC-Regular,PingFang SC";
      font-size: 26px;
      line-height: 36px;
      color: #ffffff;
      text-align: center;
      margin-top: 18px;
      span {
        font-size: 30px;
        color: #ff3047;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
      }
    }
    .button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
    }
    button {
      width: 640px;
      height: 90px;
      background: #ff3047;
      color: #ffffff;
      font-size: 34px;
      font-family: "PingFangSC-Medium,PingFang SC";
      font-weight: 500;
      text-align: center;
      border: none;
      border-radius: 10px;
    }
  }
}
</style>
