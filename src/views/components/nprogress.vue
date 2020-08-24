<template>
  <div class="wrap" :style="{height:h+'px',background:parentBgc}" :class="{'bd':radius}">
    <div
      class="son"
      :style="{width:w,height:h+'px',background:bgc,transitionDuration: sec}"
      :class="{'bd':radius}"
    ></div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    // 宽
    w: {
      type: String | Number,
      default: "100%",
    },
    // 高
    h: {
      type: String | Number,
      default: "100%",
    },
    // 背景色
    bgc: {
      type: String,
      default: "#FFFF",
    },
    // 容器的背景色
    parentBgc: {
      type: String,
      default: "#171d26",
    },
    // 动画时间
    sec: {
      type: String,
      default: "0.5s",
    },
    // 进度条圆角
    radius: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  &.bd {
    border-radius: 10px;
    // overflow: hidden;
  }
  .son {
    transition: all 0.5s;
    &.bd {
      border-radius: 10px;
      overflow: hidden;
    }
  }
}
</style>
