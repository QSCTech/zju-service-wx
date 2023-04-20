<template>
	<view class = "act-container">
		<view class = "act-title">{{act.title}}</view>
		<view>
			<view
				v-for = "tag in act.tag"
				class = "act-tag"
				:key = "tag"
			>
				{{tag}}
			</view>
		</view>
		<view style = "border:1px solid #CCC"></view> 
		<view class = "act-brief">{{act.brief}}</view>
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
	</view>
</template>

<script>
export default {
props: {
	act: {
		type: Object,
	}
},
	
data() {
	return {
		time: "error",
	};
},

beforeMount() {
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
}
}
</script>

<style>
.act-container{
	background: #FFFFFF;
	border: 0.5px solid rgba(0, 0, 0, 0.05);
	box-shadow: 0px 2px 6px rgba(217, 217, 217, 0.6);
	border-radius: 16px;
	padding: 20upx;
	margin-top: 20upx;
}
.act-title{
	font-family: 'Source Han Sans CN VF';
	font-style: normal;
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	letter-spacing: 0.15px;
	color: #7389F4;
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
	font-size: 12px;
	line-height: 24px;
	letter-spacing: 0.15px;
	color: rgba(34, 39, 69, 0.4);
	
	width: 100%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
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
</style>