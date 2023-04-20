<template>
	<view class = "background">
		<view class = "back-color"></view>
		<view class = "back-pic-contain"></view>
		
		<view v-show = "hint" class = "big-background">
		  <view class = "hint">
		    <view class = "hint-title">申请发布活动须知</view>
		    <view class = "hint-text">请将您所在的组织/社团全称和您是该组织/社团负责人的证明发送至tech@zjuqsc.com，我们确认后会发送账号密码与后台网址</view>
			<view class = "hint-button" @tap = "hideHint()">关闭</view>
		  </view>
		</view>
		
		<view class = "top">
			<view class = "card">
				<view class = "title">{{user.name}}</view>
				<view class = "text">学号：{{user.zjuId}}</view>
			</view>
			
			<view class = "card-dark" @tap = "toStar()">
				<view style = "display: flex; align-items: center;">
					<image class = "item-icon"
					src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTkiIHZpZXdCb3g9IjAgMCAyMSAxOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjUgMEwxMy41ODU5IDYuMjUyNjZMMjAuNDg2MSA3LjI1NTMyTDE1LjQ5MyAxMi4xMjIzTDE2LjY3MTcgMTguOTk0N0wxMC41IDE1Ljc1TDQuMzI4MjUgMTguOTk0N0w1LjUwNjk1IDEyLjEyMjNMMC41MTM5MDYgNy4yNTUzMkw3LjQxNDEzIDYuMjUyNjZMMTAuNSAwWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="
					></image>
					<view class = "item-text">我的收藏</view>
				</view>
				<image class = "item-next"
				src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxMCAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTk2NzA2IDEuMDQyMjJMOC40NTE4OCA4LjQ5ODc3TDAuMTk2NzA1IDE1Ljk1NTNDLTAuMDYwNzcxOSAxNi4xODc5IC0wLjA2NDQyNTQgMTYuNTc5NCAwLjIwMDYzOCAxNi44MTg4QzAuNDY3NTUgMTcuMDU5OSAwLjg5MzY5IDE3LjA1OTggMS4xNTY1OCAxNi44MjIzTDkuODAzMjkgOS4wMTIxM0M5Ljk1Mjg1IDguODc3MDQgMTAuMDE2OCA4LjY4ODM1IDkuOTkyMTQgOC41MDdDMTAuMDIzNiA4LjMyMTkyIDkuOTYwNDEgOC4xMjczNSA5LjgwMzI5IDcuOTg1NDNMMS4xNTY1OCAwLjE3NTIxOEMwLjg5OTEwOCAtMC4wNTczNTEgMC40NjU3MDQgLTAuMDYwNjQ4OCAwLjIwMDYzOSAwLjE3ODc3MUMtMC4wNjYyNzMyIDAuNDE5ODYyIC0wLjA2NjE2NTUgMC44MDQ3NzYgMC4xOTY3MDYgMS4wNDIyMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="
				></image>
			</view>
			
			<view class = "card-dark" @tap = "toMyQue()">
				<view style = "display: flex; align-items: center;">
					<image class = "item-icon"
					src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMjMiIHZpZXdCb3g9IjAgMCAyMyAyMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzY4Ml8xNzk5KSI+CjxwYXRoIGQ9Ik03LjE3Mjk5IDYuMDE2NjZIMTUuNjk2NEMxNS43Nzc2IDYuMDE1ODUgMTUuODU3OCA1Ljk5OTA1IDE1LjkzMjUgNS45NjcyNEMxNi4wMDcyIDUuOTM1NDIgMTYuMDc0OCA1Ljg4OTIgMTYuMTMxNyA1LjgzMTIyQzE2LjE4ODUgNS43NzMyNSAxNi4yMzMzIDUuNzA0NjQgMTYuMjYzNiA1LjYyOTMzQzE2LjI5MzkgNS41NTQwMyAxNi4zMDkxIDUuNDczNDggMTYuMzA4MyA1LjM5MjMxQzE2LjMwOTEgNS4zMTExMyAxNi4yOTM5IDUuMjMwNTkgMTYuMjYzNiA1LjE1NTI4QzE2LjIzMzMgNS4wNzk5NyAxNi4xODg1IDUuMDExMzcgMTYuMTMxNyA0Ljk1MzM5QzE2LjA3NDggNC44OTU0MiAxNi4wMDcyIDQuODQ5MiAxNS45MzI1IDQuODE3MzhDMTUuODU3OCA0Ljc4NTU2IDE1Ljc3NzYgNC43Njg3NyAxNS42OTY0IDQuNzY3OTVINy4xNzI5OUM3LjA5MTgyIDQuNzY4NzEgNy4wMTE1OSA0Ljc4NTQ2IDYuOTM2OTEgNC44MTcyNkM2Ljg2MjIyIDQuODQ5MDcgNi43OTQ1NCA0Ljg5NTI5IDYuNzM3NzUgNC45NTMyOEM2LjY4MDk1IDUuMDExMjggNi42MzYxNiA1LjA3OTkxIDYuNjA1OTMgNS4xNTUyNUM2LjU3NTY5IDUuMjMwNTggNi41NjA2MiA1LjMxMTE0IDYuNTYxNTcgNS4zOTIzMUM2LjU2MTU3IDUuNzM1MzkgNi44MzM3NCA2LjAxNjY2IDcuMTcyOTkgNi4wMTY2NlpNNy4xNzI5OSA5LjQ3OTEySDEzLjI0NzlDMTMuNTg2NiA5LjQ3OTEyIDEzLjg1NjQgOS4yMDAyNSAxMy44NTY0IDguODU1MjVDMTMuODU2NCA4LjUxMDI1IDEzLjU4NjYgOC4yMzEzNyAxMy4yNDc5IDguMjMxMzdINy4xNzI5OUM2LjgzMzc0IDguMjMxMzcgNi41NjE1NyA4LjUxMDI1IDYuNTYxNTcgOC44NTUyNUM2LjU2MTU3IDkuMjAwMjUgNi44MzM3NCA5LjQ3OTEyIDcuMTcyOTkgOS40NzkxMlpNMjEuMDYxMiA3LjUyMzE2TDE5LjUyODMgNi42MTU2MlYwLjY0NDI0NkMxOS41Mjk3IDAuNDc4NDM5IDE5LjQ2NTIgMC4zMTg4NTEgMTkuMzQ5MSAwLjIwMDUzQzE5LjIzMjkgMC4wODIyMDk1IDE5LjA3NDUgMC4wMTQ4MjgyIDE4LjkwODcgMC4wMTMxODM2SDMuOTU3NzhDMy42MTYxMyAwLjAxMzE4MzYgMy4zMzg3IDAuMjk0NDU0IDMuMzM4NyAwLjY0NDI0NlY2LjYxNTYyTDEuODA0NCA3LjUyMzE2TDAuNTgzMDA4IDguMTQ3MDRWMjIuMzkyMkMwLjU4MzAwOCAyMi40Nzk0IDAuNTk5Mjk5IDIyLjU1OTQgMC42MzE0MDQgMjIuNjMzN0MwLjYzMzc5OSAyMi42NDE0IDAuNjM4NTkxIDIyLjY0NjYgMC42NDA5ODcgMjIuNjUwOUMwLjY1NzI3OSAyMi42ODc4IDAuNjc3NDA0IDIyLjcyMjMgMC43MDEzNjIgMjIuNzU0NEMwLjgwODIxNiAyMi45MDM5IDAuOTc3MzYyIDIzLjAwMzYgMS4xNzMzNCAyMy4wMTA4QzEuMTgxMDEgMjMuMDEwOCAxLjE4NzI0IDIzLjAxMzIgMS4xOTQ0MiAyMy4wMTMySDIxLjY3NEMyMi4wMTIzIDIzLjAxMzIgMjIuMjg1NCAyMi43MzM4IDIyLjI4NTQgMjIuMzkxN1Y4LjIwNTk4TDIxLjA2MTIgNy41MjMxNlpNMTkuNTI4MyA4LjA1ODM5TDIwLjk3MDEgOC45MTEzMUwxOS41MjgzIDkuNzY0N1Y4LjA1ODM5Wk00Ljk1NzMyIDEuMjU5MDJIMTcuOTA5N0MxOC4yMTQ5IDEuMjU5MDIgMTguMzA2NCAxLjM1MjQ1IDE4LjMwNjQgMS42NjM0M1YxMC40OTA2TDExLjQzMzcgMTQuNTU5N0w0LjU1OTYxIDEwLjQ4ODJWMS42NjM0M0M0LjU1OTYxIDEuMzUyNDUgNC42NTQwMSAxLjI1OTAyIDQuOTU3MzIgMS4yNTkwMlpNMy4zMzg3IDkuNzY1NjZMMS44OTY0IDguOTExNzlMMy4zMzg3IDguMDU4ODdWOS43NjU2NlpNMjEuMDYxMiAyMS43Njg4SDEuODA0NFYxMC4zMDA0TDExLjEyNjEgMTUuODE5OUMxMS4xMzYyIDE1LjgyNzYgMTEuMTQ1MyAxNS44MyAxMS4xNTUzIDE1LjgzNDNMMTEuMTk2MSAxNS44NTM1QzExLjIxODEgMTUuODY0IDExLjI0MDYgMTUuODczMSAxMS4yNjM2IDE1Ljg4MDNDMTEuMjc4NSAxNS44ODU1IDExLjI5NCAxNS44ODkgMTEuMzA5NiAxNS44OTA5QzExLjMzMTcgMTUuODk2OSAxMS4zNTQ0IDE1LjkwMDMgMTEuMzc3MiAxNS45MDA5SDExLjQ5MzZDMTEuNTE1MiAxNS44OTg1IDExLjUzOTYgMTUuODkzMiAxMS41NjA3IDE1Ljg5MDlDMTEuNTc1NiAxNS44ODU2IDExLjU5MTkgMTUuODgzNyAxMS42MDY3IDE1Ljg4MDNDMTEuNjMxNiAxNS44NzM2IDExLjY1MjcgMTUuODY0IDExLjY3NzYgMTUuODUzNUMxMS42OTE1IDE1Ljg0NTggMTEuNzAzNSAxNS44NDEgMTEuNzE4NCAxNS44MzQzQzExLjcyNzkgMTUuODI5NSAxMS43Mzc1IDE1LjgyNzEgMTEuNzQ3MSAxNS44MTk5TDIxLjA2MDcgMTAuMjk3MVYyMS43Njg4IiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzY4Ml8xNzk5Ij4KPHJlY3Qgd2lkdGg9IjIzIiBoZWlnaHQ9IjIzIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
					></image>
					<view class = "item-text">我的校园反馈</view>
				</view>
				<image class = "item-next"
				src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxMCAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTk2NzA2IDEuMDQyMjJMOC40NTE4OCA4LjQ5ODc3TDAuMTk2NzA1IDE1Ljk1NTNDLTAuMDYwNzcxOSAxNi4xODc5IC0wLjA2NDQyNTQgMTYuNTc5NCAwLjIwMDYzOCAxNi44MTg4QzAuNDY3NTUgMTcuMDU5OSAwLjg5MzY5IDE3LjA1OTggMS4xNTY1OCAxNi44MjIzTDkuODAzMjkgOS4wMTIxM0M5Ljk1Mjg1IDguODc3MDQgMTAuMDE2OCA4LjY4ODM1IDkuOTkyMTQgOC41MDdDMTAuMDIzNiA4LjMyMTkyIDkuOTYwNDEgOC4xMjczNSA5LjgwMzI5IDcuOTg1NDNMMS4xNTY1OCAwLjE3NTIxOEMwLjg5OTEwOCAtMC4wNTczNTEgMC40NjU3MDQgLTAuMDYwNjQ4OCAwLjIwMDYzOSAwLjE3ODc3MUMtMC4wNjYyNzMyIDAuNDE5ODYyIC0wLjA2NjE2NTUgMC44MDQ3NzYgMC4xOTY3MDYgMS4wNDIyMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="
				></image>
			</view>
			
			<view class = "card" style = "border-radius: 14px; display: flex; align-items: center;" @tap = "showHint()">
				<image class = "notice-icon"
				src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyMCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzY4Ml8xODE3KSI+CjxwYXRoIGQ9Ik0xMCAxNi41QzE0LjM3MjQgMTYuNSAxNy45MTY3IDEzLjE0MjMgMTcuOTE2NyA5QzE3LjkxNjcgNC44NTc3NSAxNC4zNzI0IDEuNSAxMCAxLjVDNS42Mjc2MiAxLjUgMi4wODMzMyA0Ljg1Nzc1IDIuMDgzMzMgOUMyLjA4MzMzIDEzLjE0MjMgNS42Mjc2MiAxNi41IDEwIDE2LjVaTTEwIDE4QzQuNzUzNjIgMTggMC41IDEzLjk3MDMgMC41IDlDMC41IDQuMDI5NzUgNC43NTM2MiAwIDEwIDBDMTUuMjQ2NCAwIDE5LjUgNC4wMjk3NSAxOS41IDlDMTkuNSAxMy45NzAzIDE1LjI0NjQgMTggMTAgMThaTTkuMjA4MzMgNy41VjEzLjVDOS4yMDgzMyAxMy42OTg5IDkuMjkxNzQgMTMuODg5NyA5LjQ0MDIxIDE0LjAzMDNDOS41ODg2NyAxNC4xNzEgOS43OTAwNCAxNC4yNSAxMCAxNC4yNUMxMC4yMSAxNC4yNSAxMC40MTEzIDE0LjE3MSAxMC41NTk4IDE0LjAzMDNDMTAuNzA4MyAxMy44ODk3IDEwLjc5MTcgMTMuNjk4OSAxMC43OTE3IDEzLjVWNy41QzEwLjc5MTcgNy4zMDEwOSAxMC43MDgzIDcuMTEwMzIgMTAuNTU5OCA2Ljk2OTY3QzEwLjQxMTMgNi44MjkwMiAxMC4yMSA2Ljc1IDEwIDYuNzVDOS43OTAwNCA2Ljc1IDkuNTg4NjcgNi44MjkwMiA5LjQ0MDIxIDYuOTY5NjdDOS4yOTE3NCA3LjExMDMyIDkuMjA4MzMgNy4zMDEwOSA5LjIwODMzIDcuNVpNMTAgMy43NUM5Ljc5MDA0IDMuNzUgOS41ODg2NyAzLjgyOTAyIDkuNDQwMjEgMy45Njk2N0M5LjI5MTc0IDQuMTEwMzIgOS4yMDgzMyA0LjMwMTA5IDkuMjA4MzMgNC41VjUuMjVDOS4yMDgzMyA1LjQ0ODkxIDkuMjkxNzQgNS42Mzk2OCA5LjQ0MDIxIDUuNzgwMzNDOS41ODg2NyA1LjkyMDk4IDkuNzkwMDQgNiAxMCA2QzEwLjIxIDYgMTAuNDExMyA1LjkyMDk4IDEwLjU1OTggNS43ODAzM0MxMC43MDgzIDUuNjM5NjggMTAuNzkxNyA1LjQ0ODkxIDEwLjc5MTcgNS4yNVY0LjVDMTAuNzkxNyA0LjMwMTA5IDEwLjcwODMgNC4xMTAzMiAxMC41NTk4IDMuOTY5NjdDMTAuNDExMyAzLjgyOTAyIDEwLjIxIDMuNzUgMTAgMy43NVoiIGZpbGw9IiMzMzMzMzMiIGZpbGwtb3BhY2l0eT0iMC42NSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzY4Ml8xODE3Ij4KPHJlY3Qgd2lkdGg9IjE5IiBoZWlnaHQ9IjE4IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC41KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
				></image>
				<view class = "notice-text">申请活动发布权限须知</view>
			</view>
			
			<view style = "margin-top: 50upx;">
				<view class = "link-button">友情链接</view>
				<view style = "margin-top: 30upx;">
					<view v-for = "link in links" :key = "link.key" style = "display: inline-block;">
						<view style = "display: inline-block;" @tap = "toLink(link.key)">
							<image class = "link-icon" :src = "'../../static/' + link.icon"></image>
							<view class = "link-text">{{link.name}}</view>
						</view>
						<view style = "display: inline-block; width: 30upx;"></view>
					</view>
					
					<!--
					<view style = "display: inline-block;">
						<image class = "link-icon" src = "../../static/iconA.png"></image>
						<view class = "link-text">notify</view>
					</view>
					<view style = "display: inline-block; width: 30upx;"></view>
					<view style = "display: inline-block;">
						<image class = "link-icon" src = "../../static/iconA.png"></image>
						<view class = "link-text">云峰权服</view>
					</view>
					-->
				</view>
			</view>
			
			<view class = "contact-text">
				<view>联系我们</view>
				<view>求是潮产品反馈QQ群 557339512</view>
				<view>浙江大学学生会邮箱 sr@zjusu.com</view>
				<view>权服侠QQ 3096306181</view>
			</view>
			
			<view class = "power-text">Powered by 求是潮工作团队</view>
		</view>
	</view>
</template>

<script>
import request from "../../common/request";
export default {
async onLoad(){
	this.user = await request("user/get", null, "获取用户");
	console.log(this.user);
},
data() {
	return {
		user: null,
		hint: false,
		links: [
			{name: "notify", key: 0, icon: "iconA.png", appid: "wx44e158e60fd73479", path: "pages/note/note"},
			{name: "cc98", key: 1, icon: "iconB.png", appid: "wx9bd6cf4acf4c687c", path: "pages/index/index"},
		],
	}
},
methods: {
	showHint(){
		this.hint = true;
	},
	hideHint(){
		this.hint = false;
	},
	toLink(id){
		uni.navigateToMiniProgram({
			appId: this.links[id].appid,
			path: this.links[id].path,
		});
	},
	toStar(){
		uni.navigateTo({ url: "/pages/admin/star" });
	},
	toMyQue(){
		uni.navigateTo({ url: "/pages/admin/myQue" });
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

.big-background{
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, 0.25);
	z-index: 100;
}
.hint{
	position: fixed;
	left: 0;
	margin-left: 125upx;
	margin-top: 300upx;
	text-align: center;
	height: 550upx;
	width: 500upx;
	background-color: #ffffff;
	box-shadow: 0px 0px 50px rgba(43, 48, 139, 0.05);
	border-radius: 22px;
}
.hint-title{
	background: #645CEF;
	color: #ffffff;
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 22px;
	letter-spacing: 0.4px;
	color: #FFFFFF;
	padding: 20upx 0upx;
	border-radius: 20px 20px 0upx 0upx;
}
.hint-text{
	height: 300upx;
	padding: 30upx;
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 30px;
	letter-spacing: 0.4px;
	color: rgba(0, 0, 0, 0.65);
	text-align: left;

}
.hint-button{
	background: #645CEF;
	border-radius: 20px;
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 18px;
	text-align: center;
	letter-spacing: 0.4px;
	color: #ffffff;
	padding: 10upx 0upx;
	margin: 0upx 100upx;
}

.top{
	position: relative;
	flex-direction: column;
	padding: 100upx 55upx 0upx 55upx;
}

.card{
	background: #FFFFFF;
	box-shadow: 0px 4px 10px #D9D9D9;
	border-radius: 20px;
	padding: 20upx 30upx;
	font-family: 'Source Han Sans CN VF';
	margin-bottom: 30upx;
}
.title{
	display: flex;
	color: #000000;
	font-family: 'Inter';
	font-style: normal;
	font-size: 50upx;
	letter-spacing: 0.15px;
	font-weight: 700;
	margin-top: 20upx;
	margin-bottom: 20upx;
}
.text{
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 16px;
	letter-spacing: 0.4px;
	color: rgba(0, 0, 0, 0.65);
	margin-bottom: 20upx;
}

.card-dark{
	background: #645CEF;
	border-radius: 14px;
	padding: 40upx 30upx;
	font-family: 'Source Han Sans CN VF';
	margin-bottom: 30upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.item-icon{
	display: inline-block;
	width: 23px;
	height: 23px;
	margin-right: 30upx;
}
.item-text{
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 18px;
	line-height: 16px;
	letter-spacing: 0.4px;
	color: #FFFFFF;
}
.item-next{
	display: inline-block;
	width: 10px;
	height: 17px;
	right: 0;
}

.notice-icon{
	display: inline-block;
	width: 19px;
	height: 18px;
	margin-right: 30upx;
}
.notice-text{
	display: inline-block;
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	letter-spacing: 0.4px;
	color: rgba(0, 0, 0, 0.65);
}

.link-button{
	background: #FFFFFF;
	border: 2px solid #645CEF;
	border-radius: 10px;
	padding: 20upx 30upx;
	margin: 0upx 130upx;
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 15px;
	line-height: 16px;
	text-align: center;
	letter-spacing: 0.4px;
	color: #645CEF;
}
.link-icon{
	width: 78px;
	height: 78px;
	border-radius: 20upx;
}
.link-text{
	font-family: 'K2D';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	display: flex;
	align-items: center;
	text-align: center;
	letter-spacing: -0.3px;
	color: #645CEF;
	justify-content: center;
}

.contact-text{
	font-family: 'K2D';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	align-items: center;
	text-align: right;
	letter-spacing: -0.3px;
	font-feature-settings: 'tnum' on, 'lnum' on;
	color: #6C63FF;
	margin-top: 50upx;
}
.power-text{
	font-family: 'K2D';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	align-items: center;
	text-align: center;
	letter-spacing: -0.3px;
	font-feature-settings: 'tnum' on, 'lnum' on;
	color: #6C63FF;
	margin-top: 50upx;
	padding-bottom: 30upx;
}
</style>
