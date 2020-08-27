<template>
  <div class="card_wrap">
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
      <div class="comment">{{ explanation.content }}</div>
      <div class="chart">
        <div class="pic" ref="chart"></div>
        <img
          :src="userInfo.user_img ? userInfo.user_img : 'https://userimg.51hejia.com/user_default_img.png'"
          alt
          class="avater"
        />
      </div>
    </div>
    <div class="button" @click="resetTest">
      <div class="left">
        <img src="../../assets/menue.png" alt />
        <span>重新测试</span>
      </div>
      <div class="center" v-if="pladFormId != 4">
        <img src="../../assets/share.png" alt />
        <span>分享</span>
      </div>
      <div class="right" @click.stop="goDesigner">找设计师咨询方案</div>
    </div>
  </div>
</template>

<script>
import { api_getTestResult } from "../../api";
import wx from "weixin-js-sdk";
import store from "../../utils/storage";
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
          this.explanation.result = explanation.result.split("，");
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
      let fontSize = this.device ? 13 : 26;
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
      }
    },
    // 重新测试
    resetTest() {
      this.$emit("update:show", 2);
    },
  },
};
</script>
<style lang="scss" scoped>
.card_wrap {
  padding-top: 30px;
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
    margin-bottom: 72px;
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
          margin-left: -6px;
        }
      }
    }
  }
  .thumbnail {
    display: flex;
    justify-content: center;
    margin-bottom: 36px;
    span {
      line-height: 32px;
      padding: 10px;
      background: #e4f0fe;
      color: #4490f6;
      font-size: 22px;
      font-family: "PingFangSC-Regular,PingFang SC";
      margin-right: 10px;
      border-radius: 4px;
      overflow: hidden;
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
  margin-top: 40px;
  .left,
  .center {
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
    button {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }
  }
  .right {
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
