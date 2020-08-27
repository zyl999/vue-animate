<template>
  <div class="wrap">
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
      this.getAPPDate();
    },
    getAPPDate() {
      // this.$bridge.callHandler("shareHandel", { name: "zs" }, (data) => {
      //   // 处理返回数据
      //   alert(data);
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes myfirst {
  0% {
    background: rgba(255, 166, 176, 0.5);
  }
  25% {
    background: rgba(255, 166, 176, 1);
  }
  50% {
    background: rgba(255, 166, 176, 0.5);
  }
  100% {
    background: rgba(255, 166, 176, 1);
  }
}
.wrap {
  padding-top: 100px;
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
      font-family: "PingFangSC-Regular, PingFang SC";
      margin-top: 14px;
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
      i {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        // animation: myfirst 2s infinite;
        animation: myfirst 1.2s ease infinite alternate;
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
        right: 198px;
        top: 120px;
      }
      &.in1 {
        right: 70px;
        top: 262px;
      }
      &.in2 {
        right: 170px;
        bottom: 100px;
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
        left: 276px;
        top: 6px;
      }
      &.out1 {
        right: 70px;
        top: 48px;
      }
      &.out2 {
        right: -8px;
        top: 162px;
      }
      &.out3 {
        right: -10px;
        top: 334px;
      }
      &.out4 {
        right: 72px;
        top: 436px;
      }
      &.out5 {
        bottom: -28px;
        left: 280px;
      }
      &.out6 {
        left: 52px;
        bottom: 34px;
      }
      &.out7 {
        left: -16px;
        top: 320px;
      }
      &.out8 {
        left: -24px;
        top: 212px;
      }
      &.out9 {
        left: 20px;
        top: 108px;
      }
      &.out10 {
        left: 114px;
        top: 24px;
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
