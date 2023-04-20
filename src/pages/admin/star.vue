<template>
	<view class = "background">
		<view class = "back-color"></view>
		<view class = "back-pic-contain"></view>
		<view class = "top">
			<view class = "title">我的收藏</view>
			<view class = "card">
				<q-question
					v-for = "que in ques"
					:key = "que.id"
					:que = "que"
					@tap = "chooseQue(que.id)"
				>
				</q-question>
				<view style="display: flex; align-items: center; justify-content: center; width: 100%;">
					<image class = "end-pic" src = "../../static/adminBack.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import request from "../../common/request";
import qQuestion from "../../components/qQuestion.vue";
export default {
components: { qQuestion },
async onLoad(){
	this.ques = await request("user/likes/list", null, "获取收藏");
	console.log("star:", this.ques);
},

data() {
	return {
		ques: [],
	}
},

methods: {
	chooseQue(id){
		uni.navigateTo({ url: "/pages/help/infomation?id=" + id });
	},
}
}
</script>

<style>
.background{
	width: 100%;
	height: 100%;
}
.back-color{
	position: fixed;
	width: 100%;
	height: 100%;
	background: linear-gradient(180deg, #D3D0FF 7.29%, #EFEEFF 20.83%, #FBFBFB 31.77%, #FFFFFF 47.92%);
}
.back-pic-contain{
	position: absolute;
	width: 153px;
	height: 149px;
	top: 40upx;
	right: 80upx;
	background: url(../../static/adminBack.png) no-repeat left top / contain;
}
.top{
	position: relative;
	flex-direction: column;
	padding: 10upx 55upx 0upx 55upx;
}
.title{
	margin-top: 20upx;
	color: #000000;
	font-family: 'Inter';
	font-style: normal;
	font-size: 50upx;
	letter-spacing: 0.15px;
	font-weight: 700;
	display: flex;
	align-items: center;
}
.card{
	background: #FFFFFF;
	box-shadow: 0px 4px 10px #D9D9D9;
	border-radius: 20px;
	padding: 50upx 30upx 30upx 30upx;
	margin-top: 30upx;
	font-family: 'Source Han Sans CN VF';
}

.end-pic{
	margin-top: 80upx;
	margin-bottom: 50upx;
	width: 153px;
	height: 149px;
}
</style>
