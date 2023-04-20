<template>
	<view class = "background">
		<view class = "back-color"></view>
		<view class = "back-pic-contain"></view>
		<view class = "top">
			<view class = "title">
				<!--
				<image
					class = "act-back"
					@tap = "back()"
					src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAxMSAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjc4MzYgMTkuNzEyNkwxLjcwMjkzIDEwLjUwMTVMMTAuNzgzNiAxLjI5MDQ5QzExLjA2NjggMS4wMDMyIDExLjA3MDkgMC41MTk2MSAxMC43NzkzIDAuMjIzODc5QzEwLjQ4NTcgLTAuMDczOTM4OSAxMC4wMTY5IC0wLjA3Mzg0MyA5LjcyNzc2IDAuMjE5NDlMMC4yMTYzODEgOS44NjczN0MwLjA1MTg3MDEgMTAuMDM0MiAtMC4wMTg0NDUzIDEwLjI2NzMgMC4wMDg2NSAxMC40OTE0Qy0wLjAyNjAxMTIgMTAuNzIgMC4wNDM1NDc2IDEwLjk2MDMgMC4yMTYzODEgMTEuMTM1Nkw5LjcyNzc2IDIwLjc4MzZDMTAuMDExIDIxLjA3MDggMTAuNDg3NyAyMS4wNzQ5IDEwLjc3OTMgMjAuNzc5MkMxMS4wNzI5IDIwLjQ4MTMgMTEuMDcyOCAyMC4wMDU5IDEwLjc4MzYgMTkuNzEyNloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo="
				></image>
				-->
				<view style = "display: inline-block;">活动</view>
			</view>
			<view class = "card">
				
				<view v-if = "act != null">
					<view class = "info-title">活动信息</view>
					<view class = "info-container">
						<view class = "act-title">{{act.title}}</view>
						<view>
							<view
								v-for = "tag in act.tag"
								class = "act-tag"
								:key = "tag"
								v-show = "tag != '社团' && tag != '学生组织'"
							>
								{{tag}}
							</view>
						</view>
						<view class = "act-tag" style = "background: #6C63FF;">{{act.orgName}}</view>
						<view>
							<view class = "act-tag">时间</view>
							<view class = "act-info">{{time}}</view>
						</view>
						<view>
							<view class = "act-tag">地点</view>
							<view class = "act-info">{{act.position}}</view>
						</view>
						<view>
							<view class = "act-tag">人数</view>
							<view class = "act-info">{{act.number}}人</view>
						</view>
						<view class = "act-brief">{{act.brief}}</view>
					</view>
					
					<view class = "info-title">活动详情</view>
					<view class = "info-container">
						<view class = "act-text">{{act.content}}</view>
					</view>
					
					<view class = "info-title">推文链接</view>
					<view class = "info-container" @tap = "copy()">
						<view class = "act-text" style = "color: #436ff6">{{act.link}}</view>
					</view>
				</view>
				
				<view v-else>
					<view class = "empty-text" >出错了，好奇怪</view>
					<view style="display: flex; align-items: center; justify-content: center; width: 100%;">
						<image class = "end-pic" src = "../../static/activityBack.png"></image>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
import request from "../../common/request";
export default {
onLoad: async function(option){
	this.act = await request("activity/get?aid=" + option.id, null, "活动获取");
	console.log(this.act);
	const startTime = new Date(parseInt(this.act.startTime)*1000);
	const endTime = new Date(parseInt(this.act.endTime)*1000);
	console.log(startTime.getHours());
	this.time = startTime.getFullYear()+"年"+(startTime.getMonth()+1)+"月"+(startTime.getDate()+1)+"日"+startTime.getHours()+":";
	if(startTime.getMinutes() < 10) this.time = this.time+"0";
	this.time = this.time+startTime.getMinutes()+"~";
	if(startTime.getFullYear() != endTime.getFullYear()){
		this.time = this.time+endTime.getFullYear()+"年"+(endTime.getMonth()+1)+"月"+(endTime.getDate()+1)+"日"+endTime.getHours()+":";
		if(endTime.getMinutes() < 10) this.time = this.time+"0";
		this.time = this.time+endTime.getMinutes()
	} else if(startTime.getMonth() != endTime.getMonth()){
		this.time = this.time+(endTime.getMonth()+1)+"月"+(endTime.getDate()+1)+"日"+endTime.getHours()+":";
		if(endTime.getMinutes() < 10) this.time = this.time+"0";
		this.time = this.time+endTime.getMinutes();
	} else if(startTime.getDate() != endTime.getDate()){
		this.time = this.time+(endTime.getDate()+1)+"日"+endTime.getHours()+":";
		if(endTime.getMinutes() < 10) this.time = this.time+"0";
		this.time = this.time+endTime.getMinutes();
	} else {
		this.time = this.time+endTime.getHours()+":";
		if(endTime.getMinutes() < 10) this.time = this.time+"0";
		this.time = this.time+endTime.getMinutes();
	}
},

onShareAppMessage(res){
	return {
		title: this.act.title,
		path: "/pages/activity/infomation?id=" + this.act.id,
	};
},

data() {
	return {
		act: {},
		time: "",
	}
},

methods: {
	copy(){
		uni.setClipboardData({
			data: this.act.link,
			showToast: false,
			success: function () {
				console.log('复制链接成功');
				uni.showToast({
					title: "链接已复制",
					icon: "success",
				});
			},
			fail: function () {
				uni.showToast({
					title: "复制失败，请检查权限",
					icon: "error",
				});
				return;
			}
		});
	},
	back(){
		uni.reLaunch({
			url: "/pages/activity/activity",
		})
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
	right: -50upx;
	background: url(../../static/activityBack.png) no-repeat left top / contain;
}
.top{
	position: relative;
	flex-direction: column;
	padding: 10upx 55upx 0upx 55upx;
}
.act-back{
	display: inline-block;
	height: 50upx;
	width: 30upx;
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

.info-title{
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 18px;
	line-height: 16px;
	letter-spacing: 0.4px;
	color: #000000;
	margin-bottom: 30upx;
}
.info-container{
	background: #FFFFFF;
	border: 0.5px solid rgba(0, 0, 0, 0.05);
	box-shadow: 0px 2px 6px rgba(217, 217, 217, 0.6);
	border-radius: 16px;
	padding: 30upx 20upx;
	margin-bottom: 50upx;
}

.act-title{
	ont-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 24px;
	line-height: 24px;
	letter-spacing: 0.15px;
	color: #000000;
	padding-bottom: 10upx;
}
.act-tag {
	display: inline-block;
	text-align: center;
	font-weight: 400;
	background: #7788ed;
	border-radius: 100px;
	padding: 2upx 20upx;
	margin-right: 20upx;
	color: #ffffff;
	font-family: 'Source Han Sans CN VF';
	font-size: 12px;
	line-height: 20px;
	font-weight: 700;
	margin-bottom: 10upx;
}
.act-brief{
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 24px;
	letter-spacing: 0.15px;
	color: #9E9EAF;
	
	width: 100%;
	word-wrap: break-word;
	word-break: break-all;
	white-space: pre-line;
}
.act-info{
	padding: 2upx 0upx;
	display: inline-block;
	font-family: 'Source Han Sans CN VF';
	font-size: 12px;
	line-height: 20px;
	margin-bottom: 10upx;
	color: rgba(0, 0, 0, 0.65);
}
.act-text{
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 24px;
	letter-spacing: 0.15px;
	color: #000000;
	
	width: 100%;
	word-wrap: break-word;
	word-break: break-all;
	white-space: pre-line;
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
