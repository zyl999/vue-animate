<template>
  <div class="card_wrap">
    <div class="card">
      <div class="title">
        <span>{{userName}}</span> 的风格测试结果
      </div>
      <div class="desc">
        <img class="img" src="../../assets/quot_left.png" alt />
        <div class="content">
          <div class="label">现</div>
          <div class="label">代</div>
          <div class="label">简</div>
          <div class="label">约</div>
        </div>
        <img class="img" src="../../assets/quot_right.png" alt />
      </div>
      <div class="thumbnail">
        <span>最求完美</span>
        <span>有条不紊</span>
        <span>高效率</span>
        <span>果断</span>
      </div>
      <div
        class="comment"
      >“装修风格，也称设计风格，是房屋装修的整体特点。每个人的喜好不尽相同，装修风格的确立让设计师更容易把握设计的立足点，让业主朋友更容易表达出对所需的装修效果的一种需求，装修风格的确立让设计师更容易把握设计的立。</div>
      <div class="pic">
        <img class="img" src="../../assets/pic.png" alt />
        <span v-for="(i,idx) in arr" :key="idx" :class="'span' + idx">{{i}}</span>
        <img src="https://hjapi.51hejia.com/mmexport1592376066582.jpg" alt class="avater" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userName: "郭仙女",
      arr: ["现代简约", "美式", "欧式", "地中海", "日式"],
    };
  },
};
</script>
<style lang="scss" scoped>
.card_wrap {
  padding-top: 40px;
}
.card {
  width: 620px;
  height: 1034px;
  background: #ffffff;
  border-radius: 40px;
  overflow: hidden;
  margin: 0px auto;
  padding: 38px 34px;
  .title {
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
      font-family: "FZDBSJW--GB1-0,FZDBSJW--GB1";
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .label {
        width: 104px;
        height: 108px;
        text-align: center;
        line-height: 108px;
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
    margin-bottom: 52px;
  }
  .pic {
    position: relative;
    margin: 0 auto;
    width: 262px;
    height: 250px;
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
    span {
      position: absolute;
      &.span0 {
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
      }
      &.span1 {
        right: 0px;
        top: 80px;
        transform: translateX(100%);
      }
      &.span2 {
        right: 4px;
        bottom: -30px;
        transform: translateX(-50%);
      }
      &.span3 {
        left: 26px;
        bottom: -30px;
      }
      &.span4 {
        left: 0px;
        top: 80px;
        transform: translateX(-100%);
      }
    }
  }
}
</style>
