<template>
	<view class = "que-container">
		<view class = "que-title">{{que.title}}</view>
		<view>
			<view>
				<view class = "que-text">{{que.content}}</view>
			</view>
			<view style = "display: flex; justify-content: space-between;">
				<view class = "que-time">{{time}}</view>
				<view>
					<view class = "que-tag">{{que.college}}</view>
					<view class = "que-tag">{{que.type}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
props: {
	que: {
		type: Object,
	}
},

data() {
	return {
		time: "",
	};
},

beforeMount(){
	console.log("now", this.que);
	const time = new Date(parseInt(this.que.updateTime)*1000);
	this.time = time.getFullYear()+"/"+(time.getMonth()+1)+"/"+(time.getDate()+1);
}
}
</script>

<style>
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
</style>