<template>
	<view class = "background">
		<view class = "back-color"></view>
		<view class = "back-pic-contain"></view>
		<view class = "top">
			<view class = "title">活动</view>
			<view class = "slogan">最新校园活动资讯</view>
			<view class = "card">
				<find @search = "search"/>
				<view class = "tag-list">
					<view
						v-for = "tag in tags"
						:class = "tag.class"
						:key = "tag.key"
						@tap = "changeTag(tag.key)"
					>
						{{tag.name}}
					</view>
				</view>
					
				<q-activity
					v-for = "act in activities"
					:key = "act.id"
					:act = "act"
					@tap = "chooseAct(act.id)"
				>
				</q-activity>
				<view class = "empty-text" v-if = "activities == null">空空如也，好奇怪</view>
				<view style="display: flex; align-items: center; justify-content: center; width: 100%;">
					<image class = "end-pic" src = "../../static/activityBack.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import request from "../../common/request";
import find from '../../components/find.vue';
import qActivity from "../../components/qActivity.vue";
export default {
components: { find, qActivity },
data() {
	return {
		tags:[
			{name: "全部", key: 0, class: "tag-on", status: ["综素", "二课", "体育", "美育", "志愿服务", "社团", "学生组织"]},
			{name: "综素", key: 1, class: "tag", status: ["综素"]},
			{name: "二课", key: 2, class: "tag", status: ["二课"]},
			{name: "体育", key: 3, class: "tag", status: ["体育"]},
			{name: "美育", key: 4, class: "tag", status: ["美育"]},
			{name: "志愿服务", key: 5, class: "tag", status: ["志愿服务"]},
			{name: "社团", key: 6, class: "tag", status: ["社团"]},
			{name: "学生组织", key: 7, class: "tag", status: ["学生组织"]},
		],
		activities: [],
		pageNum: 1,
		pageSize: 20,
		nowTags: 0,
	}
},

async onLoad() {
	const date = Math.floor(new Date().getTime()/1000);
	const req = {
		pageNum: this.pageNum,
		pageSize: this.pageSize,
		tag: this.tags[0].status,
		status: ["Reviewed"],
		endTime: date
	};
	this.activities = await request("activity/list", req, "活动获取");
	console.log("activities:", this.activities);
},

async onPullDownRefresh() {
	console.log('refresh', this.nowTags);
	if(this.nowTags == -1){
		this.nowTags = 0;
		this.tags[0].class = "tag-on";
	}
	this.pageNum = 1;
	const date = Math.floor(new Date().getTime()/1000);
	const req = {
		pageNum: this.pageNum,
		pageSize: this.pageSize,
		tag: this.tags[this.nowTags].status,
		status: ["Reviewed"],
		endTime: date,
	};
	this.activities = await request("activity/list", req, "活动获取");
	console.log("activities:", this.activities);
	uni.stopPullDownRefresh();
},

async onReachBottom(){
	const date = Math.floor(new Date().getTime()/1000);
	this.pageNum = this.pageNum+1;
	const req = {
		pageNum: this.pageNum,
		pageSize: this.pageSize,
		tag: this.tags[this.nowTags].status,
		status: ["Reviewed"],
		endTime: date,
	};
	const acts = await request("activity/list", req, "活动获取");
	console.log("activities:", acts);
	for(let i = 0; i < this.pagesize; i++) if(acts[i]) this.activities.push(acts[i]);
},

methods: {
	async search(text){
		console.log(text);
		this.tags[this.nowTags].class = "tag";
		this.nowTags = -1;
		const date = Math.floor(new Date().getTime()/1000);
		this.pageNum = 1;
		const req = {
			pageNum: this.pageNum,
			pageSize: this.pageSize,
			title: text,
			status: ["Reviewed"],
			endTime: date
		};
		this.activities = await request("activity/list", req, "活动获取");
		console.log("activities:", this.activities);
	},
	async changeTag(id){
		if(this.nowTags != -1) this.tags[this.nowTags].class = "tag";
		this.tags[id].class = "tag-on";
		this.nowTags = id;
		const date = Math.floor(new Date().getTime()/1000);
		this.pageNum = 1;
		const req = {
			pageNum: this.pageNum,
			pageSize: this.pageSize,
			tag: this.tags[id].status,
			status: ["Reviewed"],
			endTime: date
		};
		this.activities = await request("activity/list", req, "活动获取");
		console.log("activities:", this.activities);
	},
	chooseAct(id){
		console.log("to", id);
		uni.navigateTo({ url: "/pages/activity/infomation?id=" + id });
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
	width: 114px;
	height: 216px;
	top: 40upx;
	right: 80upx;
	background: url(../../static/activityBack.png) no-repeat left top / contain;
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
.slogan{
	display: flex;
	margin-bottom: 40upx;
	color: #000000;
	font-family: 'Inter';
	font-style: normal;
	font-size: 26upx;
	letter-spacing: 0.15px;
}
.card{
	background: #FFFFFF;
	box-shadow: 0px 4px 10px #D9D9D9;
	border-radius: 20px;
	padding: 30upx 30upx 0upx 30upx;
	font-family: 'Source Han Sans CN VF';
}

.tag-list {
	margin: 30upx 0upx 30upx 0upx;
	font-size: 12px;
	line-height: 20px;
}
.tag {
	display: inline-block;
	text-align: center;
	font-weight: 400;
	background: #F4F3FF;
	border-radius: 100px;
	padding: 4upx 20upx;
	margin-right: 20upx;
	color: #6C63FF;
	font-family: 'Source Han Sans CN VF';
	font-weight: 700;
	margin-bottom: 10upx;
}
.tag-on {
	display: inline-block;
	text-align: center;
	font-weight: 400;
	background: #6C63FF;
	border-radius: 100px;
	padding: 4upx 20upx;
	margin-right: 20upx;
	color: #ffffff;
	font-family: 'Source Han Sans CN VF';
	font-weight: 700;
	margin-bottom: 10upx;
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
	width: 95px;
	height: 180px;
}
</style>
