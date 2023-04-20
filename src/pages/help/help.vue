<template>
	<view class = "background">
		<view class = "back-color"></view>
		<view class = "back-pic-contain"></view>
		<view class = "top">
			<view class = "title">求助</view>
			<view class = "tag-list">
				<view v-for = "tag in tags" :class = "tag.class" :key = "tag.name" @tap = "changeTag(tag.name)">
					<image :src = "'../../static/'+[tag.src]" style = "width: 32px; height: 32px;"></image>
					<view>{{tag.name}}</view>
				</view>
			</view>
			<view class = "card">
				<view v-show = "tagNow == '校园反馈'">
					<q-question
						v-for = "que in questions"
						:key = "que.id"
						:que = "que"
						@tap = "chooseQue(que.id)"
					>
					</q-question>
				</view>
				<view v-show = "tagNow == '失物招领' || tagNow == '法律援助'">
					<view class = "empty-text">锐意开发中，敬请期待</view>
				</view>
				
				<view style="display: flex; align-items: center; justify-content: center; width: 100%;">
					<image class = "end-pic" src = "../../static/helpBack.png"></image>
				</view>
			</view>
		</view>
		<view class = "button-list">
			<q-button text = "提问" background = "#e7e6fd" color = "#232743" @click = "askQue()" textSize = "24" class = "que-button"></q-button>
			<view style = "width: 150upx;"></view>
			<q-button text = "搜索" background = "#232743" color = "#e7e6fd" @click = "searchQue()" textSize = "24" class = "que-button"></q-button>
		</view>
	</view>
</template>

<script>
import request from "../../common/request";
import qQuestion from "../../components/qQuestion.vue";
import qButton from "../../components/qButton.vue";
export default {
components: { qQuestion, qButton },
async onLoad(){
	const req = {
		pageNum: this.pageNum,
		pageSize: this.pageSize,
		isHide: false,
		status: ["Answered"],
	};
	this.questions = await request("question/list", req, "提问查询");
	console.log(this.questions);
},

async onPullDownRefresh() {
	console.log('refresh');
	this.pageNum = 1;
	const req = {
		pageNum: this.pageNum,
		pageSize: this.pageSize,
		isHide: false,
		status: ["Answered"],
	};
	this.questions = await request("question/list", req, "提问查询");
	console.log(this.questions);
	uni.stopPullDownRefresh();
},

async onReachBottom(){
	this.pageNum = this.pageNum+1;
	const req = {
		pageNum: this.pageNum,
		pageSize: this.pageSize,
		isHide: false,
		status: ["Answered"],
	};
	const ques = await request("question/list", req, "提问查询");
	console.log("questions:", ques);
	for(let i = 0; i < ques.length; i++) this.questions.push(ques[i]);
	console.log("now", this.questions.length);
},

data() {
	return {
		tags: [
			{name: "校园反馈", class: "tag-on", src: "helpAOn.png", srcOn: "helpAOn.png", srcOff: "helpAOff.png"},
			{name: "失物招领", class: "tag", src: "helpBOff.png", srcOn: "helpBOn.png", srcOff: "helpBOff.png"},
			{name: "法律援助", class: "tag", src: "helpCOff.png", srcOn: "helpCOn.png", srcOff: "helpCOff.png"}
		],
		tagNow: "校园反馈",
		questions: [],
		pageNum: 1,
		pageSize: 20,
	}
},

methods: {
	changeTag(tag){
		this.tagNow = tag;
		for (let i = 0; i < this.tags.length; i++) {
			if(this.tags[i].name == tag){
				this.tags[i].class = "tag-on";
				this.tags[i].src = this.tags[i].srcOn;
			} else {
				this.tags[i].class = "tag";
				this.tags[i].src = this.tags[i].srcOff;
			}
		}
	},
	chooseQue(id){
		console.log("to", id);
		uni.navigateTo({ url: "/pages/help/infomation?id=" + id });
	},
	askQue(){
		uni.navigateTo({ url: "/pages/help/ask" });
	},
	searchQue(){
		uni.navigateTo({ url: "/pages/help/search" });
	}
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
	background: linear-gradient(180deg, #F8F8FF 0%, #EFEEFF 42.71%, #D3D0FF 77.6%);
}
.back-pic-contain{
	position: absolute;
	height: 201px;
	width: 167px;
	top: 40upx;
	right: 30upx;
	background: url(../../static/helpBack.png) no-repeat left top / contain;
}
.top{
	position: relative;
	flex-direction: column;
	padding: 10upx 55upx 0upx 55upx;
}
.title{
	display: flex;
	margin-top: 20upx;
	color: #000000;
	font-family: 'Inter';
	font-style: normal;
	font-size: 50upx;
	letter-spacing: 0.15px;
	font-weight: 700;
}

.tag-list{
	display: flex;
	text-align: center;
	font-family: 'Source Han Sans CN';
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 24px;
	letter-spacing: 0.15px;
	margin-top: 20upx;
}
.tag{
	display: inline-block;
	color: #B2A8D2;
	margin-right: 20upx;
}
.tag-on{
	display: inline-block;
	color: #222745;
	margin-right: 20upx;
}

.card{
	background: #FFFFFF;
	box-shadow: 0px 4px 10px #D9D9D9;
	border-radius: 20px;
	padding: 30upx;
	font-family: 'Source Han Sans CN VF';
	margin-top: 20upx;
}

.empty-text{
	text-align: center;
	margin: 100upx 0upx;
	ont-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 500;
	font-size: 22px;
	line-height: 32px;
	letter-spacing: -0.3px;
	color: rgba(47, 46, 65, 0.65);

}
.end-pic{
	margin-top: 80upx;
	margin-bottom: 50upx;
	width: 150px;
	height: 180px;
}

.button-list{
	position: fixed;
	bottom: 50upx;
	display: flex;
	justify-content: center;
	width: 100%;
}
.que-button{
	display: inline-block;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(34, 39, 69, 0.05);
	border-radius: 50px;
}
</style>
