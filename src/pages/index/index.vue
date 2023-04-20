<template>
	<view class="background">
		<view v-if = "!consentAgreed" style = "display: flex; flex-direction: column; align-items: center;">
			<view class = "card">
				<consent />
			</view>
			<q-button text = "同意并继续" background = "#232743" color = "#ffffff" @click = "agree()" style = "margin-top: 50upx; width: 500upx;"/>
		</view>
		
		<view v-else class = "card">
			<image class="logo" src="/static/logo.png"></image>
			<view>
				<text class="title">欢迎使用zju权服小程序</text>
			</view>
			<view v-show = "showLogin" class = "login-area">
				<q-button text = "使用浙大统一身份认证登录" background = "#232743" color = "#ffffff" @click = "login()" style = "width: 500upx;"/>
				<q-button text = "继续使用" background = "#232743" color = "#ffffff" @click = "check()" style = "margin-top: 20upx; width: 500upx;"/>
				<view class = "tip">
					<view>1、点击按钮复制登录链接</view>
					<view>2、打开浏览器，粘贴并打开链接</view>
					<view>3、登录后重新进入小程序，点击继续使用</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import request from "../../common/request";
import qButton from "../../components/qButton.vue";
import Consent from "../../components/consent.vue";
export default {

components: { qButton, Consent },

data() {
	return {
		consentAgreed: true,
		showLogin: false,
		user: null,
	}
},

async onLoad() {
	this.consentAgreed = uni.getStorageSync("consentAgreed");
	const code = await this.$store.dispatch("wxLogin");
	console.log(code);
	const user = await this.$store.dispatch("login", code);
	this.user = user;
	console.log(user);
	if(user.name === "Unknown") this.showLogin = true;
	if(this.consentAgreed && user.name != "Unknown"){
		console.log("yes");
		uni.switchTab({
			url: "/pages/activity/activity",
		});
	}
},

methods: {
	async login(){
		let cookie = this.user.cookies[0];
		let index = cookie.indexOf("=");
		cookie = cookie.substring(index+1);
		index = cookie.indexOf(";");
		cookie = cookie.substring(0, index);
		console.log(cookie);

		uni.setClipboardData({
			data: 'https://www.qsc.zju.edu.cn/passport/v4/zju/login?success=https://www.qsc.zju.edu.cn/zjurs/api/zju_passport/login_callback?AppToken=' + cookie,
			success: function () {
				console.log('复制链接成功');
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
	async agree(){
		this.consentAgreed = true;
		uni.setStorage({
			key: "consentAgreed",
			data: true,
		});
		if(this.user.name != "Unknown"){
			console.log("yes");
			uni.switchTab({
				url: "/pages/activity/activity",
			});
		}
	},
	async check(){
		const code = await this.$store.dispatch("wxLogin");
		console.log(code);
		const user = await this.$store.dispatch("login", code);
		console.log(user);
		if(user.name != "Unknown"){
			console.log("yes");
			uni.switchTab({
				url: "/pages/activity/activity",
			})
		} else {
			uni.showToast({
				title: "未登录身份认证",
				icon: "error",
			});
		}
	}
}

}
</script>

<style>
.background {
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 100%;
	background: linear-gradient(180deg, #F8F8FF 0%, #EFEEFF 42.71%, #D3D0FF 77.6%);
}

.card{
	background: #FFFFFF;
	box-shadow: 0px 4px 10px #D9D9D9;
	border-radius: 20px;
	padding: 50upx;
	font-family: 'Source Han Sans CN VF';
	align-items: center;
	justify-content: center;
	display: flex;
	flex-direction: column;
	margin: 200upx 50upx 0upx 50upx;
}

.logo {
	height: 200upx;
	width: 200upx;
	margin-bottom: 50upx;
}

.title {
	color: #000000;
	font-size: 40upx;
	font-family: 'Inter';
	font-weight: 400;
}

.login-area{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 50upx;
}

.tip{
	font-size: 32rpx;
	color: #8f8f94;
	font-family: 'Inter';
	margin-top: 40upx;
}
</style>
