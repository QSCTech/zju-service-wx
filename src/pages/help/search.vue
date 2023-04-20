<template>
	<view class = "background">
		<view class = "back-color"></view>
		<view class = "back-pic-contain"></view>
		<view class = "top">
			<view class = "title">搜索</view>
			<view class = "card">
				<view class = "init">
					<view class = "search-type" @tap = "showTag()">{{tagsCollege[nowCollege].name}}{{" "}}{{tagsType[nowType].name}}{{"｜"}}</view>
					<view class = "input-container">
						<input
							class = "input-body"
							v-model = "text"
							placeholder = "搜索您的问题、意见、建议"
							placeholder-class = "input-placeholder"
							type = "text"
							@input = "handleSearchInput"
							confirm-type = "search"
							@confirm = "searchText"
						/>
					</view>
					<view class = "upd">
						<image
							style = "height: 40upx; width: 40upx"
							@tap = "searchText"
							src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyNiAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIyNiIgaGVpZ2h0PSIyMSIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfNzA1XzIwMjMiIHRyYW5zZm9ybT0ibWF0cml4KDAuMDA4OTc0MzYgMCAwIDAuMDExMTExMSAwLjA5NjE1MzggMCkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF83MDVfMjAyMyIgd2lkdGg9IjkwIiBoZWlnaHQ9IjkwIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUZvQUFBQmFDQVlBQUFBNHFFRUNBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBR0JVbEVRVlI0bk8yY3pXOWNOUkRBWFNRKzJ4NmdmRjRSZ2dNSUpMNUJJRGlnQWhLSWo3OGpRRzhRTGtVSUNTNlVrTUNoRjRpMlpHMHNKVjE3azFXQ3FoWXFXbWdWMFozWkpVRklVSXBLQ1EzaHdvRTJGVmswZmtsRnd2UGJENUpuKzhVL3lkSnFzM2s3YjNiZWVEeWVNV09SU0NRU2lVUWlrVWdrRXZrdlU2WDYxcXFvUDZrRTltdU93MXJnMTByZ0QwcmdINXJEZVJyMG10N1RITCtpenlTZmJlelVldnFxbEV0R1ZoZ3QxYTlYQW5ZcGdZZU5NZ1cyZWhySmozQzR3dUVWdXViRkw5anNWRGs4cWdVcXhmRkN6OHExajBXNnRwYjFSOWhtUlV0OFRIUDhZZ09VbXpvVWg4L3BSMldiaFhIWnZGRUpLQ2tPUzNrcGVjMlFxb3czc0NLamVPTkZNNkc1VVhEcm9uVW5NanpQaW9hVXpjdVVnUGU3czJJNG93U09LSUV2VVRTaFpQT1c4Ukc4ZXUvZTZVdHAwR3Q2ejBRYVpYelpmSmJEcjEyNGtpWE44VDI2RmlzQ1VqYTNhUUdmZFhiemVGWUxIQmlYZUUrdjMxY3A0NzNtUnhVNDMrRjNUcEtNTEdUR3htWjJLQTdITzdDdVU0cGpuNVJIcjF5djc2WnJtYWRCd004ZEtQc1l5Y3BDaEJZT2lzUFJOamU1U05hM2tSWmxGTTdoRGNYaFhKc2YrM2h3bGswK3VhMjc0UEN0S3ArNFBTK1pxcUoraHhJdzA4Nk5CT1d6eVVxemxZemN4Vko1cWxUZlN1RmRtNGhrRHdzQkxlclBaa1VYU3VBSHUzZTNMbkVsWDZ2VjJxSUV2SnNWalZUTCtBTHpmekdTRVNkekdHU2VvQVVNWlNoN3dlczhpZWF3TDh0ZHVMVGt0WkFzbVc2RTR6RHpOWGVSNFRLYVBxWXZwV3h1VXdKbXJRc2FINU5SdGdRUmhWVjVSaGZkb3NwNHB6VXR5K0VnOHdrdDhTSDdUQTV2TXM5UkF0NjJ5dStUVlp1Y3IyWEZ0NTZydlkwTSt4VEgwNVo3Mk05OGdHYm41UVI3MmdLZ2p3V0NFckRMdG5xdHlXK3U4MVpBU2hDRllNMnJVZ2FXUkJUbFRKaHJ6QjVmdWlVTXNNRFFIQWJURlEySG5BcG1sclRXalZTNG13V0dGbzM3YkpHVDA2ZlRKTjNUbFh5R0JVaXIxZHFpQmN5bDNWTkY0QlBPQkZNY1hyZFl3Q2NzVURRbHZOTG5uRmRkQ2pYczdlVFJJMVFQWWpHZWo1Z3JUSlZRNm9xcXNaTUZpaXJYbjdLNHd5UE9oTklDVDZZSk5UNkNON05BVWJUaG01NWsrdEdkVUJ3VzBvU2FsTTFyV0tDTWpjM3NzTGpEZVdkQzJVSTcyc3BpZ1NMTk5seDZpT2RNcUNJcXVsYjcvdkowMXdIbm5RbFZSTmVoUjZhdnRWajBnanVoTnRGa3FEaWM4aTY4b3lKeUZpaWF3OU1XMS9HbGR3c1dxb1ZqZ2FKczJVZ0JKWWRDWWI4bDVpeXpRRkVDaENXODYzY21GTGtJeXlwcWpoSTByRUJKcFNwdlBPNDBXVzRMOGFpcWt3VkdwVngvSU4xd2NKRlN3bDRtL3Frc2pBV0d0aFRWS0lFSFBNNTI0VmtmYXpuYVBKMi9lN3YzbWJrNUcxQzZWR1Zzem83dW03bUorVnh1WUlyQUE3RHFxYVRLOUJkTC9Qd3A4d1VxTXJGWUExbjFXOHh6dE1CM2dpaWdJYWlQejdKMFBVZEY0TXhUcXFKeGx5MXk4bUlTWEFzMVM5cUtIS25TM25sNGxFS2xNcnRkYy96T1lpQkxTc0NEekVkb21XcDlCQVZLLzhwMllUUzRzbDJDT2xLekd6WmhpSG1DNHZoaHhyd3lUK2xTNWpPS041NEp2YlZDaDlKVlN4MnBHUzdFdUJFWHJXWVY4c2xaN2lLa1ppR0NXc2lvbFN6N2htQ1dpc0R6alM3U0o3NDFGajFCMjFrc3FDV3RnQ09kTkhSV0tyUGJOMUtPVGhvNlZ5c2JKdzk5ZlBJS0ZsYUxNaDdyNE1aT201ekpPcTRpa3pKY3M2eE9YL0VWemJKTlEwNGJONkwvUGR0ekdLektFL2Yza3MrbS8wbFNuVEJrU3hBVld0bkdad3ZjMCtVeEVuTlVjRWlXVG1WYUU3eCtLeDBkUWFVTU5HaW52U0xoTnZwYmNoYVQyUm41clFzbExpM0xORkVvWlJPS3czTzJFZ1dkNDZBbmgyUWhtVWlKaFZRMldXTFNLdzUvTzFLMFhOdVRzbHlkcEFvMVFhN0srSEU0bUtNVkg4aktYUlRXc2xmWXp4c1BVNHVaYmZQZ2Y0NUZ5aWQzbXVvc3ZMSUp5aTNRamd3MTVuUVQ4Nlk4NGhlTTlYTHM2MlZuWkZNb2V3VnF6S0dlRWMzeE5hcTBwNU5zekpHWk5KRW11ZVBGNU1oTStJa3FpTXp4YmdMN3FTUmdQZEt4SFNsYllLMFF5blpOb1NkSTM0akt6dnZNUG80NlduWU9SR1huU0ZSMmprUmw1NGdKL1FUV1l1am5pYkpEUE4waFRHVnorRFBFR3ZIZ2xLMEUvT1ZUSFV0aGxlMjBTYitvMUpJbTBBRnlGMlRKcE9UZ1R1NE5DZkxKMFM5SElwRklKQktKUkNKc3cva0hJZHk4Z3FFNmtQb0FBQUFBU1VWT1JLNUNZSUk9Ii8+CjwvZGVmcz4KPC9zdmc+Cg=="
						></image>
					</view>
				</view>
				
				<view v-show = "tagShow" style = "margin-top: 50upx;">
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
				
				<view v-show = "!tagShow" style = "margin-top: 30upx;">
					<q-question
						v-for = "que in questions"
						:key = "que.id"
						:que = "que"
						@tap = "chooseQue(que.id)"
					/>
					<view v-if = "!questions">
						<view class = "empty-text" v-if = "activities == null">空空如也，去提问吧</view>
						<view style="display: flex; align-items: center; justify-content: center; width: 100%;">
							<image class = "end-pic" src = "../../static/helpBack.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-show = "!tagShow" class = "button-list">
			<q-button text = "前往提问" background = "#232743" color = "#e7e6fd" @click = "toQue()" textSize = "24" class = "que-button"></q-button>
		</view>
		
	</view>
</template>

<script>
import request from "../../common/request";
import qQuestion from "../../components/qQuestion.vue";
import qButton from "../../components/qButton.vue";
export default {
components: { qQuestion, qButton },
async onReachBottom(){
	this.pageNum = this.pageNum+1;
	let college, type;
	if(this.tagsCollege[this.nowCollege].name == "全部") college = null;
	else college = [this.tagsCollege[this.nowCollege].name];
	if(this.tagsType[this.nowType].name == "全部") type = null;
	else type = [this.tagsType[this.nowType].name];
	const req = {
		pageNum: this.pageNum,
		pageSize: this.pageSize,
		isHide: false,
		status: ["Answered"],
		context: this.text,
		college: college,
		type: type,
	};
	const ques = await request("question/list", req, "提问查询");
	console.log("questions:", ques);
	for(let i = 0; i < this.pagesize; i++) if(ques[i]) this.questions.push(ques[i]);
},
data() {
	return {
		text: "",
		tagShow: true,
		tagsCollege:[
			{name: "全部", key: 0, class: "tag-on"},
			{name: "校会", key: 1, class: "tag"},
			{name: "蓝田", key: 2, class: "tag"},
			{name: "丹青", key: 3, class: "tag"},
			{name: "云峰", key: 4, class: "tag"},
			{name: "竺院", key: 5, class: "tag"},
			{name: "海宁", key: 6, class: "tag"},
			{name: "公管", key: 7, class: "tag"},
			{name: "外院", key: 8, class: "tag"},
			{name: "传院", key: 9, class: "tag"},
			{name: "经院", key: 10, class: "tag"},
			{name: "法学", key: 11, class: "tag"},
			{name: "文学", key: 12, class: "tag"},
			{name: "历史", key: 13, class: "tag"},
			{name: "哲学", key: 14, class: "tag"},
			{name: "马院", key: 15, class: "tag"},
			{name: "数院", key: 16, class: "tag"},
			{name: "物理", key: 17, class: "tag"},
			{name: "化学", key: 18, class: "tag"},
			{name: "地科", key: 19, class: "tag"},
			{name: "心理", key: 20, class: "tag"},
			{name: "机械", key: 21, class: "tag"},
			{name: "材料", key: 22, class: "tag"},
			{name: "能源", key: 23, class: "tag"},
			{name: "电气", key: 24, class: "tag"},
			{name: "建工", key: 25, class: "tag"},
			{name: "化工", key: 26, class: "tag"},
			{name: "海洋", key: 27, class: "tag"},
			{name: "航院", key: 28, class: "tag"},
			{name: "农学", key: 29, class: "tag"},
			{name: "光电", key: 30, class: "tag"},
			{name: "信电", key: 31, class: "tag"},
			{name: "控院", key: 32, class: "tag"},
			{name: "计院", key: 33, class: "tag"},
			{name: "软件", key: 34, class: "tag"},
			{name: "动科", key: 35, class: "tag"},
			{name: "医学", key: 36, class: "tag"},
			{name: "药学", key: 37, class: "tag"},
			{name: "生科", key: 38, class: "tag"},
			{name: "环境", key: 39, class: "tag"},
			{name: "教育", key: 40, class: "tag"},
			{name: "管院", key: 41, class: "tag"},
			{name: "生医工", key: 42, class: "tag"},
			{name: "高分子", key: 43, class: "tag"},
			{name: "生工食品", key: 44, class: "tag"},
		],
		tagsType:[
			{name: "全部", key: 0, class: "tag-on"},
			{name: "饮食", key: 1, class: "tag"},
			{name: "交通", key: 2, class: "tag"},
			{name: "住宿", key: 3, class: "tag"},
			{name: "网络", key: 4, class: "tag"},
			{name: "科研", key: 5, class: "tag"},
			{name: "学习", key: 6, class: "tag"},
			{name: "环境", key: 7, class: "tag"},
			{name: "其他", key: 8, class: "tag"},
		],
		nowCollege: 0,
		nowType: 0,
		questions: [],
		pageNum: 1,
		pageSize: 20,
	}
},
methods: {
	handleSearchInput(e){
		this.text = e.detail.value;
		console.log(this.text);
	},
	async searchText(){
		this.pageNum = 1;
		let college, type;
		if(this.tagsCollege[this.nowCollege].name == "全部") college = null;
		else college = [this.tagsCollege[this.nowCollege].name];
		if(this.tagsType[this.nowType].name == "全部") type = null;
		else type = [this.tagsType[this.nowType].name];
		const req = {
			pageNum: this.pageNum,
			pageSize: this.pageSize,
			isHide: false,
			status: ["Answered"],
			context: this.text,
			college: college,
			type: type,
		};
		this.questions = await request("question/list", req, "提问查询");
		console.log(this.questions);
		this.tagShow = false;
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
	showTag(){
		this.tagShow = true;
	},
	toQue(){
		uni.navigateBack({
			delta: 1,
		});
		uni.navigateTo({ url: "/pages/help/ask" });
	},
	chooseQue(id){
		console.log("to", id);
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
	padding: 30upx;
	font-family: 'Source Han Sans CN VF';
	margin-top: 20upx;
}

.init {
	display: flex;
	flex-direction: row;
	background: #f4f3fe;
	box-shadow: inset 0px 4px 4px rgba(217, 217, 217, 0.3);
	border-radius: 20px;
	align-items: center;
	justify-content: center;
}
.search-type{
	font-family: 'Source Han Sans CN';
	font-style: normal;
	font-weight: 500;
	font-size: 26rpx;
	display: flex;
	align-items: center;
	letter-spacing: -0.3px;
	color: #7389F4;
	margin-left: 20rpx;
	white-space: nowrap;
	height: 30px;
}
.input-container {
	height: 30px;
	width: 100%;
	flex-grow: 1;
	display: flex;
	align-items: center;
	padding-right: 10px;
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
.input-placeholder {
	flex-grow: 1;
	font-weight: 400;
	font-size: 26upx;
	line-height: 24px;
	color: #AAAABC;
	font-family: 'Source Han Sans CN';
}
.upd {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20upx;
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
	width: 232px;
	height: 279px;
}
</style>
