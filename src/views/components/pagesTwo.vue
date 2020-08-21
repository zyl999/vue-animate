<template>
	<div class="wrap">
		<!-- 进度条 -->
		<nprogress :h="4" :w="npgressW" bgc="rgba(255, 255, 255, 0.8)" parentBgc="#171d26" />
		<div class="title"></div>
		<div class="stack-wrapper">
			<stack
				ref="stack"
				:pages="someList"
				:stackinit="stackinit"
				@progressHandle="progressHandle"
				@change="changeHandel"
			></stack>
		</div>
		<div class="controls">
			<div class="left">
				<div class="button" @click="prev">
					<img src="../../assets/no_like.png" alt />
				</div>
				<span>不喜欢</span>
			</div>
			<div class="left">
				<div class="button" @click="next">
					<img src="../../assets/like.png" alt />
				</div>
				<span>喜欢</span>
			</div>
		</div>
	</div>
</template>
<script>
import stack from "./stack.vue";
import nprogress from "./nprogress.vue";
export default {
	// el: "#stack",
	data() {
		return {
			npgressW: "0%",
			someList: [],
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
	mounted() {
		let that = this;
		setTimeout(function() {
			that.someList = [
				{
					src:
						"https://hjapi.51hejia.com/A1B1AD88-6CE1-496B-B18E-B1EA09BF9C0A1597199755.jpeg?imageMogr2/thumbnail/374x258.3671497584541>/ignore-error/1",
					progress: 0,
					opacity: 1,
				},
				{
					src: "https://hjapi.51hejia.com/7ad5d80d-56ca-4d04-ab97-e6bbe839c844.jpg",
					progress: 0,
					opacity: 1,
				},
				{
					src: "https://hjapi.51hejia.com/mmexport1592376066582.jpg",
					progress: 0,
					opacity: 1,
				},
				{
					src: "https://imagehj.51hejia.com/bc41cb34-12a6-4278-9447-9220be2e0809.jpg",
					progress: 0,
					opacity: 1,
				},
				{
					src: "https://imagehj.51hejia.com/bc41cb34-12a6-4278-9447-9220be2e0809.jpg",
					progress: 0,
					opacity: 1,
				},
				{
					src: "https://userimg.51hejia.com/user_default_img.png",
					progress: 0,
					opacity: 1,
				},
				{
					src: "https://userimg.51hejia.com/user_default_img.png",
					progress: 0,
					opacity: 1,
				},
			];
		}, 2000);
	},
	components: {
		stack,
		nprogress,
	},
	methods: {
		prev() {
			this.$refs.stack.$emit("prev");
		},
		next() {
			this.$refs.stack.$emit("next");
		},
		// 进度条
		progressHandle(data) {
			// 更新进度条
			console.log("进度条", data);
			this.npgressW = data + "%";
			if (data == 100) {
				// 最后一张跳转页面
				this.$emit("update:show", 3);
			}
		},
		// 图片滑动
		changeHandel(label, idx, progess) {
			if (label == "opacity") {
				console.log("透明度", this.someList[idx], label);
				this.$set(this.someList[idx], label, progess);
				return;
			}
			this.$set(this.someList[idx], label, progess * 2);
		},
	},
};
</script>
<style lang="scss" scoped>
.wrap {
	.title {
		height: 140px;
	}
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
}
.controls {
	margin-top: 100px;
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
			height: 46px;
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
