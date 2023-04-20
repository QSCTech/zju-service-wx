<template>
	<view class = "background">
		<view class = "back-color"></view>
		<view class = "back-pic-contain"></view>
		<view class = "top">
			<view class = "title">提问</view>
			<view v-show = "!tagShow" class = "card">
				<view class = "que-text">标题（不超过20字）</view>
				<view class = "input-container">
					<input
						class = "input-body"
						v-model = "title"
						placeholder = " "
						placeholder-class = "input-placeholder"
						type = "text"
						@input = "handleTitleInput"
						confirm-type = "done"
						maxlength = "20"
					/>
				</view>
				<view class = "que-text">内容</view>
				<view class = "input-container" style = "height: 500upx;">
					<textarea
						class = "input-body-content"
						v-model = "content"
						placeholder = " "
						placeholder-class = "input-placeholder"
						type = "text"
						@input = "handleContentInput"
						confirm-type = "done"
						maxlength = "-1"
					>
					</textarea>
				</view>
			</view>
			
			<view v-show = "tagShow" class = "card">
				<view class = "que-text">学生会</view>
				<view class = "tag-list">
					<view v-for = "tag in tagsCollege" :class = "tag.class" :key = "tag.key" @tap = "changeCollege(tag.key)">
						{{tag.name}}
					</view>
				</view>
				<view class = "que-text">类别</view>
				<view class = "tag-list">
					<view v-for = "tag in tagsType" :class = "tag.class" :key = "tag.key" @tap = "changeType(tag.key)">
						{{tag.name}}
					</view>
				</view>
			</view>
		</view>
		<view v-show = "!tagShow" class = "button-list">
			<q-button text = "上传提问" background = "#232743" color = "#e7e6fd" @click = "showTag()" textSize = "24" class = "que-button"></q-button>
		</view>
		<view v-show = "tagShow && !checkShow" class = "button-list">
			<q-button text = "确定" background = "#232743" color = "#e7e6fd" @click = "showCheck()" textSize = "24" class = "que-button"></q-button>
		</view>
		
		<view v-show = "checkShow" class = "big-background">
		  <view class = "check">
		    <view class = "que-title">{{title}}</view>
			<view>
				<view class = "tag-on">{{tagsCollege[nowCollege].name}}</view>
				<view class = "tag-on">{{tagsType[nowType].name}}</view>
			</view>
			<textarea disabled = "false" maxlength = "-1" :value = "content" class = "que-content"></textarea>
		  </view>
		  <view class = "button-list">
		  	<q-button text = "返回" background = "#232743" color = "#e7e6fd" @click = "hideCheck()" textSize = "24" class = "que-button"></q-button>
		  	<view style = "width: 30upx"></view>
		  	<q-button text = "提交" background = "#232743" color = "#e7e6fd" @click = "sendQue()" textSize = "24" class = "que-button"></q-button>
		  </view>
		</view>
	</view>
</template>

<script>
import request from "../../common/request";
import qButton from "../../components/qButton.vue";
export default {
components: { qButton },
data() {
	return {
		title: "",
		content: "",
		tagShow: false,
		checkShow: false,
		tagsCollege:[
			{name: "校会", key: 0, class: "tag-on"},
			{name: "蓝田", key: 1, class: "tag"},
			{name: "丹青", key: 2, class: "tag"},
			{name: "云峰", key: 3, class: "tag"},
			{name: "竺院", key: 4, class: "tag"},
			{name: "海宁", key: 5, class: "tag"},
			{name: "公管", key: 6, class: "tag"},
			{name: "外院", key: 7, class: "tag"},
			{name: "传院", key: 8, class: "tag"},
			{name: "经院", key: 9, class: "tag"},
			{name: "法学", key: 10, class: "tag"},
			{name: "文学", key: 11, class: "tag"},
			{name: "历史", key: 12, class: "tag"},
			{name: "哲学", key: 13, class: "tag"},
			{name: "马院", key: 14, class: "tag"},
			{name: "数院", key: 15, class: "tag"},
			{name: "物理", key: 16, class: "tag"},
			{name: "化学", key: 17, class: "tag"},
			{name: "地科", key: 18, class: "tag"},
			{name: "心理", key: 19, class: "tag"},
			{name: "机械", key: 20, class: "tag"},
			{name: "材料", key: 21, class: "tag"},
			{name: "能源", key: 22, class: "tag"},
			{name: "电气", key: 23, class: "tag"},
			{name: "建工", key: 24, class: "tag"},
			{name: "化工", key: 25, class: "tag"},
			{name: "海洋", key: 26, class: "tag"},
			{name: "航院", key: 27, class: "tag"},
			{name: "农学", key: 28, class: "tag"},
			{name: "光电", key: 29, class: "tag"},
			{name: "信电", key: 30, class: "tag"},
			{name: "控院", key: 31, class: "tag"},
			{name: "计院", key: 32, class: "tag"},
			{name: "软件", key: 33, class: "tag"},
			{name: "动科", key: 34, class: "tag"},
			{name: "医学", key: 35, class: "tag"},
			{name: "药学", key: 36, class: "tag"},
			{name: "生科", key: 37, class: "tag"},
			{name: "环境", key: 38, class: "tag"},
			{name: "教育", key: 39, class: "tag"},
			{name: "管院", key: 40, class: "tag"},
			{name: "生医工", key: 41, class: "tag"},
			{name: "高分子", key: 42, class: "tag"},
			{name: "生工食品", key: 43, class: "tag"},
		],
		tagsType:[
			{name: "饮食", key: 0, class: "tag-on"},
			{name: "交通", key: 1, class: "tag"},
			{name: "住宿", key: 2, class: "tag"},
			{name: "网络", key: 3, class: "tag"},
			{name: "科研", key: 4, class: "tag"},
			{name: "学习", key: 5, class: "tag"},
			{name: "环境", key: 6, class: "tag"},
			{name: "其他", key: 7, class: "tag"},
		],
		nowCollege: 0,
		nowType: 0,
	}
},
methods: {
	handleTitleInput(e){
		this.title = e.detail.value;
		console.log(this.title);
	},
	handleContentInput(e){
		this.content = e.detail.value;
		console.log(this.content);
	},
	showTag(){
		let flag = false;
		for (var i = 0; i < this.title.length; i++) {
			if(this.title[i] != " ") flag = true;
		}
		if(this.title == "" || (!flag)){
			uni.showToast({
				title: "无标题",
				icon: "error",
			});
			return;
		}
		flag = false;
		for (var i = 0; i < this.content.length; i++) {
			if(this.content[i] != " " && this.content[i] != "\n") flag = true;
		}
		if(this.content == "" || (!flag)){
			uni.showToast({
				title: "无内容",
				icon: "error",
			});
			return;
		}
		this.tagShow = true;
	},
	changeCollege(key){
		this.tagsCollege[this.nowCollege].class = "tag";
		this.tagsCollege[key].class = "tag-on";
		this.nowCollege = key;
	},
	changeType(key){
		this.tagsType[this.nowType].class = "tag";
		this.tagsType[key].class = "tag-on";
		this.nowType = key;
	},
	showCheck(){
		this.checkShow = true;
	},
	hideCheck(){
		this.checkShow = false;
		this.tagShow = false;
	},
	async sendQue(){
		const user = await request("user/get", null, "获取用户");
		const newQue = {
			senderId: user.id,
			title: this.title,
			content: this.content,
			status: "Unanswered",
			college: this.tagsCollege[this.nowCollege].name,
			type: this.tagsType[this.nowType].name,
			isHide: true,
		};
		await request("question/add", newQue, "发送提问");
		uni.navigateBack({
		    delta: 1,
		});
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
.card{
	background: #FFFFFF;
	box-shadow: 0px 4px 10px #D9D9D9;
	border-radius: 20px;
	padding: 50upx 30upx 30upx 30upx;
	font-family: 'Source Han Sans CN VF';
	margin-top: 30upx;
}

.que-text{
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 12px;
	line-height: 24px;
	letter-spacing: 0.15px;
	color: rgba(34, 39, 69, 0.4);
	
	width: 100%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	margin-bottom: 30upx;
}

.input-container {
	height: 30px;
	display: flex;
	align-items: center;
	flex-direction: row;
	background: #f4f3fe;
	box-shadow: inset 0px 4px 4px rgba(217, 217, 217, 0.3);
	border-radius: 20px;
	padding: 0upx 20upx;
	margin-bottom: 50upx;
}
.input-container picker {
	width: 100%;
}
.input-body {
	width: 100%;
	color: #000000;
	font-family: 'Source Han Sans CN';
	font-size: 26upx;
}
.input-body-content{
	height: calc(100% - 40upx);
	width: 100%;
	color: #000000;
	font-family: 'Source Han Sans CN';
	font-size: 26upx;
	word-wrap: break-word;
	word-break: break-all;
	white-space: pre-line;
	padding: 20upx 0upx;
}
.input-placeholder {
	flex-grow: 1;
	font-weight: 400;
	font-size: 26upx;
	line-height: 24px;
	color: #AAAABC;
	font-family: 'Source Han Sans CN';
}

.tag-list {
	margin: 0upx 0upx 30upx 0upx;
	font-size: 12px;
	line-height: 20px;
}
.tag {
	display: inline-block;
	text-align: center;
	font-weight: 400;
	background: #b3befa;
	border-radius: 5px;
	padding: 4upx 20upx;
	margin-right: 20upx;
	color: #ffffff;
	font-family: 'Source Han Sans CN VF';
	font-weight: 700;
	margin-bottom: 20upx;
}
.tag-on {
	display: inline-block;
	text-align: center;
	font-weight: 400;
	background: #7788ed;
	border-radius: 5px;
	padding: 4upx 20upx;
	margin-right: 20upx;
	color: #ffffff;
	font-family: 'Source Han Sans CN VF';
	font-weight: 700;
	margin-bottom: 20upx;
}

.button-list{
	position: fixed;
	bottom: 100upx;
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

.big-background{
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, 0.25);
	z-index: 100;
}
.check{
	position: fixed;
	left: 0;
	margin-left: 75upx;
	margin-top: 200upx;
	text-align: center;
	height: 800upx;
	width: 600upx;
	background-color: #ffffff;
	box-shadow: 0px 0px 50px rgba(43, 48, 139, 0.05);
	border-radius: 22px;
}
.que-title{
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	letter-spacing: 0.15px;
	color: #7389F4;
	margin: 30upx 20upx;
}
.que-content{
	font-family: 'Source Han Sans CN';
	font-style: normal;
	font-weight: 350;
	font-size: 16px;
	line-height: 23px;
	letter-spacing: -0.3px;
	font-feature-settings: 'tnum' on, 'lnum' on;
	color: #7389F4;
	height: 500upx;
	width: calc(100% - 60upx);
	margin: 30upx;
	word-wrap: break-word;
	word-break: break-all;
	white-space: pre-line;
}
</style>
