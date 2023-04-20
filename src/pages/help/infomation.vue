<template>
	<view class = "background">
		<view class = "back-color"></view>
		<view class = "back-pic-contain"></view>
		<view class = "top">
			<view class = "title">求助详情</view>
			<view class = "card">
				<view v-if = "que != null">
					<view class = "que-container">
						<view class = "que-title">{{que.title}}</view>
						<view>
							<view style = "display: flex; justify-content: space-between;">
								<view class = "que-time">{{time}}</view>
								<view>
									<view class = "que-tag">{{que.college}}</view>
									<view class = "que-tag">{{que.type}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class = "que-content">{{que.content}}</view>
					<view class = "que-response">{{que.response}}</view>
				</view>
				
				<view v-else>
					<view class = "empty-text" >出错了，好奇怪</view>
					<view style="display: flex; align-items: center; justify-content: center; width: 100%;">
						<image class = "end-pic" src = "../../static/helpBack.png"></image>
					</view>
				</view>
				
			</view>
		</view>
		<view class = "button-list" v-if = "que != null">
			<button class = "que-button" open-type = "share">
				<image class = "que-icon" src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzMyAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF82NTZfNDIwMCkiPgo8cmVjdCB5PSItMSIgd2lkdGg9IjM0IiBoZWlnaHQ9IjM0IiBmaWxsPSJ1cmwoI3BhdHRlcm4wKSIvPgo8L2c+CjxkZWZzPgo8cGF0dGVybiBpZD0icGF0dGVybjAiIHBhdHRlcm5Db250ZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIj4KPHVzZSB4bGluazpocmVmPSIjaW1hZ2UwXzY1Nl80MjAwIiB0cmFuc2Zvcm09InNjYWxlKDAuMDExMTExMSkiLz4KPC9wYXR0ZXJuPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzY1Nl80MjAwIj4KPHJlY3Qgd2lkdGg9IjMzIiBoZWlnaHQ9IjMzIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8aW1hZ2UgaWQ9ImltYWdlMF82NTZfNDIwMCIgd2lkdGg9IjkwIiBoZWlnaHQ9IjkwIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUZvQUFBQmFDQVlBQUFBNHFFRUNBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBRE9VbEVRVlI0bk8yY1RXOU9RUmlHajBxa3NaSGFrb3JFeDBiVVNrU2lhUEVicEF2L292d00xUVhxSTM0QUczdjZ0YklpSkZvU0syRWxXdFVTSkZ3eTZhekVlK2EwYzk3NU92ZVZkUE8rZmVjOGMrZmt6RHpQdWVlcEtpR0VFRUlJSVlRUWVRQmNCTzRDYjRBTis3Y00zQUV1eEk0dmU0QWp3QUp1NW9IRHNlUE5FbUFVV0tFNTVuL1B4STQ3eHp0NWhhM3pHVGdVTy81c0FHYlpQZ3V4NDg5cDRmTmxQUFk4a2dlNDV5MHp6TVNlUi9Ld3VZWHpaVG4yUEpJSFdHOUI2UFhZODBnZVlMVUZvZGRpenlONWdPY3RDTDBVZXg3SncyWmE3WXNXUXhmQXlSYUVIbk5lcU9zQUI0QWZIaUxQeHA1RDhnQjdnRmNlSWlzRmR3RU1Bb3VlSXF1b1ZBY3dBRHp5RU5uVVJsUk1jZ0ZNTzRTY01qc0pXK3pmc0VuTmt2MU1DMThUZ0dzT2tXODJHa2owQnJnTS9LNFIrVEd3czJZSTRRSTQ1OWpHbVlWeDBEbVE2QTF3ekZIVGVBM3NyUmxDdUFEMkErOXJSUDVva2hiblFNSXJJVmtEVHRRTUlWcElTSDZaMTFqT2dZUXpJWGxZSS9JZjRFck5FS0lKTnVHb1k3TEszRHIxSFhnSFBERFdLV0JIaEpnbUhTSlBWd1ZhcDh3ejhtakF1Q2JzWTZFWHByNHhVQlZxblRMNzE5RUFjWTBEUDR0SVNEeXNVNnZtdDMyTWE4UnUxZW9Ta3FFcUZ4bytMb0phcDRCaG0zVDB3bnczWEhYTU9qWFdja3hEOW03dGhibkxSNm9PV3FkQ2ttZEMwcEoxS2hSbTV6RlJkZGc2RllxOEVwS01oYjVhNVlvZUhZR3dxWFp1aStHbEtqZHM3Y0tYc3kzSFZONzJ6bUNQZlNWbG5XSXpZZmxRVE1KaU1HZnJVank5QkJ3SHZoU1RnaHVNRGNvS3R4V1JUd2VJYTZ5WW90SS9kL1pjQTVIblFwNHdwYVF5Nlg5S2t6UFdMbVgyMmQvc052QStjRDVTVEpQRkZQNVRCN2hlYkVLVEV1amxiRGlBWGNDVDRoS2FoQTAwTDJ2RS9pb0RUVXNBKzJRSlM4ZmthSFpOTWprR3N1MCtBM2EzY3JHdWc0em9TU1UwdHdLR1V6YkFEWWZZVS9ibzhsdDFDZXR2UXVOQ1hjSUNIdWhVbDdBVzM5QzQwQkhsTGI2aDhUbDBQOWY0WWwwR09JVS82aElXNk8yK0dxTzRBRjYwSUxTNmhBVnFYcVV1WVlHc2J1b1NGc2pxcGk1aGdSYkQyODRMZFIzYXNicXBXVW9UZ0tjZUlzODN1b2lvak5BSGdVL2JFRmtwZUNDcm03cUU5ZG5xcGk1aGZiSzZxVXVZRUVJSUlZUVFvaXFhdjZyaEo1RWNRWTc4QUFBQUFFbEZUa1N1UW1DQyIvPgo8L2RlZnM+Cjwvc3ZnPgo="
				></image>
				<view style = "display: inline-block;">分享求助</view>
			</button>
			<view style = "width: 30upx;"></view>
			<image v-show = "!liked" class = "que-icon" @tap = "like()"
				src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMjkiIHZpZXdCb3g9IjAgMCAzMCAyOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI3Ljc1MDEgMTAuMDY2N0wxOS42ODM1IDkuMzY2NjdMMTYuNTMzNSAxLjk1QzE1Ljk2NjggMC42IDE0LjAzMzUgMC42IDEzLjQ2NjggMS45NUwxMC4zMTY4IDkuMzgzMzNMMi4yNjY3OSAxMC4wNjY3QzAuODAwMTIxIDEwLjE4MzMgMC4yMDAxMjEgMTIuMDE2NyAxLjMxNjc5IDEyLjk4MzNMNy40MzM0NSAxOC4yODMzTDUuNjAwMTIgMjYuMTVDNS4yNjY3OSAyNy41ODMzIDYuODE2NzkgMjguNzE2NyA4LjA4MzQ1IDI3Ljk1TDE1LjAwMDEgMjMuNzgzM0wyMS45MTY4IDI3Ljk2NjdDMjMuMTgzNSAyOC43MzMzIDI0LjczMzUgMjcuNiAyNC40MDAxIDI2LjE2NjdMMjIuNTY2OCAxOC4yODMzTDI4LjY4MzUgMTIuOTgzM0MyOS44MDAxIDEyLjAxNjcgMjkuMjE2OCAxMC4xODMzIDI3Ljc1MDEgMTAuMDY2N1pNMTUuMDAwMSAyMC42NjY3TDguNzMzNDUgMjQuNDVMMTAuNDAwMSAxNy4zMTY3TDQuODY2NzkgMTIuNTE2N0wxMi4xNjY4IDExLjg4MzNMMTUuMDAwMSA1LjE2NjY3TDE3Ljg1MDEgMTEuOUwyNS4xNTAxIDEyLjUzMzNMMTkuNjE2OCAxNy4zMzMzTDIxLjI4MzUgMjQuNDY2N0wxNS4wMDAxIDIwLjY2NjdaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K"
			></image>
			<image v-show = "liked" class = "que-icon" @tap = "unlike()"
				src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyOCAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4LjA1MDEgOS42NjY3NkwxNS42MDAxIDEuNjAwMUMxNS4xMTY4IDAuMDE2NzY0MyAxMi44ODM0IDAuMDE2NzY0MyAxMi40MTY4IDEuNjAwMUw5Ljk1MDA5IDkuNjY2NzZIMi41MzM0M0MwLjkxNjc2MSA5LjY2Njc2IDAuMjUwMDk0IDExLjc1MDEgMS41NjY3NiAxMi42ODM0TDcuNjMzNDMgMTcuMDE2OEw1LjI1MDA5IDI0LjcwMDFDNC43NjY3NiAyNi4yNTAxIDYuNTY2NzYgMjcuNTAwMSA3Ljg1MDA5IDI2LjUxNjhMMTQuMDAwMSAyMS44NTAxTDIwLjE1MDEgMjYuNTMzNEMyMS40MzM0IDI3LjUxNjggMjMuMjMzNCAyNi4yNjY4IDIyLjc1MDEgMjQuNzE2OEwyMC4zNjY4IDE3LjAzMzRMMjYuNDMzNCAxMi43MDAxQzI3Ljc1MDEgMTEuNzUwMSAyNy4wODM0IDkuNjgzNDMgMjUuNDY2OCA5LjY4MzQzSDE4LjA1MDFWOS42NjY3NloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo="
			></image>
		</view>
	</view>
</template>

<script>
import request from "../../common/request";
export default {
async onLoad(option){
	this.id = option.id;
	this.que = await request("question/get?qid=" + option.id, null, "求助获取");
	const time = new Date(parseInt(this.que.updateTime)*1000);
	this.time = time.getFullYear()+"/"+(time.getMonth()+1)+"/"+(time.getDate()+1);
	const liked = await request("user/likes/check?qid=" + option.id, null, "是否收藏");
	this.liked = liked;
	
	const user = await request("user/get", null, "获取用户");
	if(this.que.senderId != user.id && (this.que.status == "Unanswered" || this.que.isHide))
		this.que = null;
},

onShareAppMessage(res){
	return {
		title: this.que.title,
		path: "/pages/help/infomation?id=" + this.id,
	};
},

data() {
	return {
		id: "",
		que: null,
		time: "",
		liked: false,
	}
},

methods: {
	async like(){
		this.liked = true;
		await request("user/likes/add?qid=" + this.id, null, "收藏");
	},
	async unlike(){
		this.liked = false;
		await request("user/likes/delete?qid=" + this.id, null, "取消收藏");
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
	padding: 30upx;
	font-family: 'Source Han Sans CN VF';
	margin-top: 20upx;
}

.que-container{
	background: #FFFFFF;
	border: 0.5px solid rgba(0, 0, 0, 0.05);
	box-shadow: 0px 2px 6px rgba(217, 217, 217, 0.6);
	border-radius: 16px;
	padding: 30upx 20upx 20upx 20upx;
	margin-bottom: 20upx;
}
.que-title{
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	letter-spacing: 0.15px;
	color: #7389F4;
	padding-bottom: 10upx;
}
.que-time{
	display: inline-block;
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 12px;
	line-height: 24px;
	letter-spacing: 0.15px;
	color: rgba(34, 39, 69, 0.4);
}
.que-tag {
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

.que-content{
	font-family: 'Source Han Sans CN';
	font-style: normal;
	font-weight: 350;
	font-size: 16px;
	line-height: 23px;
	display: flex;
	align-items: center;
	letter-spacing: -0.3px;
	font-feature-settings: 'tnum' on, 'lnum' on;
	color: #7389F4;
	margin-top: 30upx;
}
.que-response{
	font-family: 'Source Han Sans CN';
	font-style: normal;
	font-weight: 350;
	font-size: 16px;
	line-height: 160.8%;
	display: flex;
	align-items: center;
	letter-spacing: 0.2px;
	font-feature-settings: 'tnum' on, 'lnum' on;
	color: #222745;
	margin-top: 30upx;
	margin-bottom: 100upx;
}

.button-list{
	position: fixed;
	bottom: 100upx;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
}
.que-button{
	background: #222745;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	border-radius: 50px;
	height: 50px;
	font-family: 'Source Han Sans CN';
	font-style: normal;
	font-weight: 500;
	font-size: 22px;
	line-height: 24px;
	letter-spacing: 0.15px;
	color: #FFFFFF;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0upx 30upx 0upx 20upx;
	margin: 0upx;
}
.que-icon{
	height: 32px;
	width: 32px;
	display: inline-block;
	margin: 0upx 10upx;
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
