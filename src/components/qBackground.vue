<template>
	<view class = "background">
		<view class = "back-pic" :style = "{background: 'url(../../static/' + [pic] + ')'}">
		</view>
		<view class = "higher">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pic: String,
		},
	};
</script>

<style scoped>
.background{
	height: 100%;
	background: linear-gradient(180deg, #F8F8FF 0%, #EFEEFF 42.71%, #D3D0FF 77.6%);
}

.back-pic{
	position: absolute;
	width: 266px;
	height: 180px;
	top: 40upx;
	right: -50upx;
	background-size: contain;
}

.higher{
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}
</style>