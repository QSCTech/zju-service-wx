<template>
	<view
		class = "button"
		:style = "{ background: background, fontSize: activeSize, color: color }"
		@click = "handleClick"
	>
		<view class="button-text"> {{ text }} </view>
	</view>
</template>

<script>
export default {

props: {
    text: {
		type: String,
    },
	background: {
		type: String,
		default: "#6C63FF",
	},
    color: {
		type: String,
		default: "#ffffff",
    },
    disabled: {
		type: Boolean,
    },
    textSize: {
		type: Number,
    },
},

computed: {
    activeSize() {
		if (this.textSize) {
			return this.textSize.toString() + "px";
		} else {
			return "17px";
		}
    },
},

methods: {
    handleClick() {
		if (!this.disabled) {
			this.$emit("click");
		}
    },
},

};
</script>

<style scoped>

.button {
  border-radius: 82px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 44px;
}

.button-text {
  font-family: "Intel";
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin: 0px 28px;
  overflow: hidden;
  white-space: nowrap;
}

</style>
