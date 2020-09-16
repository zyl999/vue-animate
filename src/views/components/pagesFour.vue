<template>
  <div class="card_wrap">
    <div class="center">
      <div class="card">
      <div class="title">
        <span>{{ userInfo.nick_name }}</span> 的风格测试结果
      </div>
      <div class="desc">
        <img class="img" src="../../assets/quot_left.png" alt />
        <div class="content">
          <div
            class="label"
            :class="{ mr: i != 0 }"
            v-for="(item, i) in explanation.category_name"
            :key="i"
          >{{ item }}</div>
        </div>
        <img class="img" src="../../assets/quot_right.png" alt />
      </div>
      <div class="thumbnail">
        <span v-for="(v, i) in explanation.result" :key="i">{{ v }}</span>
      </div>
      <div class="comment four_line_ellipsis">{{ explanation.content }}</div>
      <div class="chart">
        <div class="pic" ref="chart"></div>
        <img
          :src="userInfo.user_img ? userInfo.user_img : 'https://userimg.51hejia.com/user_default_img.png'"
          alt
          class="avater"
        />
      </div>
    </div>
    </div>
    <div class="button">
      <div class="left" @click.stop="resetTest">
        <img src="../../assets/menue.png" alt />
        <span>重新测试</span>
      </div>
      <!-- <div class="buttonCenter" v-if="pladFormId != 4" @click.stop="share">
        <img src="../../assets/share.png" alt />
        <span>分享</span>
      </div> -->
      <div class="right" @click.stop="goDesigner">找设计师咨询方案</div>
    </div>
  </div>
</template>

<script>
import { api_getTestResult } from "../../api";
import wx from "weixin-js-sdk";
import store from "../../utils/storage";
import jsBridgeApp from "../../utils/util.js";
export default {
  props: {
    pladFormId: {
      type: String | Number,
      default: 4,
    },
  },
  components: {},
  data() {
    return {
      userInfo: {
        user_name: "",
        nick_name: "",
        user_img: "",
      },
      longFlag:false,
      device: store.get("device"),
      userName: "郭仙女",
      arr: ["现代简约", "美式", "欧式", "地中海", "日式"],
      explanation: {
        category_name: "",
        content: "",
        result: "",
      },
      score_list: [],
    };
  },
  created() {
    this.result();
    document.title = "测试结果"; 
  },
  methods: {
    result() {
      this.$ajax(api_getTestResult, {}).then((res) => {
        console.log("测试结果", res);
        if (res.code == 200) {
          if (res.result.user_info) {
            this.userInfo = res.result.user_info;
          }
          let categoryName = [];
          let explanation = res.result.explanation;
          this.explanation = explanation;
          this.explanation.result = explanation.result.split("、");
          this.explanation.category_name = explanation.category_name.split("");
          this.score_list = res.result.score_list.slice(0, 5);
          let scorArr = [];
          let score_list = this.score_list.map((item) => {
            scorArr.push(item.score);
            return { text: item.type_name, max: 2, min: -2 };
          });
          this.initCharts(score_list, scorArr);
        }
      });
    },
    initCharts(score_list, scorArr) {
      let pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 2;
      let fontSize = this.device;
      if (this.device) {
        fontSize = 13;
      } else {
        console.log("pixelRatio", pixelRatio);
        fontSize = pixelRatio == 2 ? 26 : 40;
      }
      let potion = this.device ? ["50%", "53%"] : ["50%", "50%"];
      let myChart = this.$echarts.init(this.$refs.chart);
      console.log(this.$refs.chart); // 绘制图表
      myChart.setOption({
        radar: [
          {
            name: {
              textStyle: {
                color: "#333333",
                fontSize: fontSize,
              },
            },
            indicator: score_list,
            center: potion,
            startAngle: 90,
            splitNumber: 3,
            splitArea: {
              areaStyle: {
                color: "#ffffff",
              },
            },
          },
        ],
        series: [
          {
            // name: '成绩单',
            // [10, 91, 80, 30, 70
            type: "radar",
            data: [
              {
                value: scorArr,
                // name: '李四',
                lineStyle: {
                  color: "rgba(255, 48, 71, 0.5)",
                },
                areaStyle: {
                  opacity: 0.6,
                  color: "rgba(255, 48, 71, 0.12)",
                },
              },
            ],
          },
        ],
      });
    },
    // 找设计师
    goDesigner() {
      let pladFormId = store.get("pladFormId");
      if (pladFormId == 4) {
        wx.miniProgram.navigateTo({ url: "/pages_designer/pages_designer" });
      } else {
        jsBridgeApp("designer", {});
      }
    },
    // 重新测试
    resetTest() {
      this.$emit("update:show", 2);
    },
    // 分享嵌套在app上会有
    share() {
      jsBridgeApp("shareHande", {});
    },
  },
};
</script>
<style lang="scss" scoped>
.card_wrap {
  // padding-top: 30px;
  height: 100vh;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

}
.center{
  width: 100%;
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card {
  width: 620px;
  height: 1024px;
  background: #ffffff;
  border-radius: 40px;
  overflow: hidden;
  margin: 0px auto;
  padding: 38px 0px;
  box-sizing: border-box;
  .title {
    padding: 0px 34px;
    color: #333333;
    font-size: 30px;
    font-family: "PingFangSC-Medium,PingFang SC";
    span {
      font-size: 34px;
      font-weight: bold;
    }
  }
  .desc {
    margin-top: 74px;
    margin-bottom: 60px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    .img {
      width: 36px;
      height: 30px;
    }
    .content {
      height: 112px;
      font-size: 72px;
      font-family: "hzgb";
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 0px 20px;
      .label {
        width: 104px;
        height: 108px;
        text-align: center;
        line-height: 108px;
        background-image: url("../../assets/line.png");
        background-repeat: no-repeat;
        background-size: 104px 108px;
        &.mr {
          margin-left: -4px;
        }
        &:not(:first-child) {
          background-image: url("../../assets/line1.png");
          background-repeat: no-repeat;
          background-size: 104px 108px;
        }
      }
    }
  }
  .thumbnail {
    display: flex;
    justify-content: center;
    margin-bottom: 36px;
    padding: 0 34px;
    span {
      flex-basis: 1;
      padding: 4px 10px;
      background: #e4f0fe;
      color: #4490f6;
      font-size: 22px;
      font-family: "PingFangSC-Regular,PingFang SC";
      margin-right: 10px;
      border-radius: 4px;
      width: auto;
    }
  }
  .comment {
    font-family: "PingFangSC-Regular,PingFang SC";
    font-size: 26px;
    color: #333333;
    line-height: 36px;
    margin-bottom: 30px;
    padding: 0px 34px;
  }
  .four_line_ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .chart {
    position: relative;
    margin: 0 auto;
    // width: 500px;
    // height: 500px;
    width: 100%;
    height: 400px;
    .img {
      width: 262px;
      height: 250px;
    }
    .avater {
      display: block;
      width: 50px;
      height: 50px;
      box-sizing: border-box;
      border: 2px solid #ffffff;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -20px);
    }
  }
  .pic {
    // width: 500px;
    // height: 500px;
    width: 100%;
    height: 400px;
  }
}
.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 66px;
  margin-top: 20px;
  box-sizing: border-box;
  .left,
  .buttonCenter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-family: "PingFangSC-Regular,PingFang SC";
    color: #ffffff;
    position: relative;
    
    img {
      width: 44px;
      height: 44px;
      margin-bottom: 6px;
    }
  }
  .right {
    display: inline-block;
    width: 400px;
    height: 90px;
    border-radius: 10px;
    background: #ff3047;
    color: #ffffff;
    font-size: 34px;
    font-family: "PingFangSC-Semibold,PingFang SC";
    font-weight: 600;
    text-align: center;
    line-height: 90px;
  }
}
</style>
