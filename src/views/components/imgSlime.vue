<template>
	<img class="pub-image" :src="slimSrc" :style="{ opacity: opacity }" alt="" />
</template>
<script>
export default {
	props: {
		opacity: {
			type: Number | String,
		},
		src: {
			//图片资源地址
			type: String,
		},
		w: {
			//图片需要的宽 - 瘦身图
			type: Number | String,
		},
		h: {
			//图片需要的高 - 瘦身图
			type: Number | String,
		},
	},
	data() {
		return {
			controlledSrc: this.src,
		};
	},
	computed: {
		slimSrc() {
			//瘦身图
			let src = this.controlledSrc;
			let pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 2;
			if (this.w) {
				if (src.includes("?")) {
					if (src.split("?")[1]) {
						//七牛多命令行报错(imageslim && imageMogr2)
						src = src.split("?")[0] + "?" + src.split("?")[1].replace("imageslim", "");
					}
					src += "&imageMogr2/thumbnail/" + this.w * pixelRatio + "x";
					if (this.h) {
						src += this.h * pixelRatio;
					}
					src += "/ignore-error/1";
				} else {
					src += "?imageMogr2/thumbnail/" + this.w * pixelRatio + "x";
					if (this.h) {
						src += this.h * pixelRatio;
					}
					src += "/ignore-error/1";
				}
			} else {
				src += "?imageMogr2/thumbnail/750x/ignore-error/1";
			}
			return src;
		},
	},
	watch: {
		src(val) {
			this.controlledSrc = val;
		},
	},
	methods: {},
};
</script>
<style lang="scss">
.pub-image {
	width: 100%;
	height: 100%;
	display: block;
	object-fit: cover;
}
</style>
