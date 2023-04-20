<template>
	<view class = "background">
		<view class = "back-color"></view>
		<view class = "back-pic-contain"></view>
		<view class = "top">
			<view class = "title">我的校园反馈</view>
			<view class = "card">
				<view class = "item-text">未得到反馈</view>
				
				<q-question
					v-for = "que in quesUn"
					:key = "que.id"
					:que = "que"
					@tap = "chooseQue(que.id)"
				>
				</q-question>
				
				<view v-if = "!quesUn" class = "empty-text">暂无未反馈问题，快去提问吧</view>
				
				<view class = "item-text" style = "margin-top: 50upx;">已得到反馈</view>
				
				<q-question
					v-for = "que in ques"
					:key = "que.id"
					:que = "que"
					@tap = "chooseQue(que.id)"
				>
				</q-question>
				
				<view v-if = "!ques" class = "empty-text">暂无已反馈问题，快去提问吧</view>
				
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
	const user = await request("user/get", null, "获取用户");
	this.id = user.id;
	const reqUn = {
		pageNum: 1,
		pageSize: -1,
		senderId: this.id,
		status: ["Unanswered"],
	};
	this.quesUn = await request("question/list", reqUn, "提问查询");
	console.log(this.quesUn);
	const req = {
		pageNum: 1,
		pageSize: -1,
		senderId: this.id,
		status: ["Answered"],
	};
	this.ques = await request("question/list", req, "提问查询");
	console.log(this.ques);
},

data() {
	return {
		id: "",
		quesUn: [],
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

.item-text{
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 18px;
	line-height: 16px;
	letter-spacing: 0.4px;
	color: #000000;
	margin-bottom: 30upx;
}
.empty-text{
	text-align: center;
	ont-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 32px;
	letter-spacing: -0.3px;
	color: #7389F4;
}

.end-pic{
	margin-top: 80upx;
	margin-bottom: 50upx;
	width: 153px;
	height: 149px;
}
</style>
