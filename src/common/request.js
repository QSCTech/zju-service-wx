function request(url, data, task = "请求", method = "POST") {
	console.log("req url: ", url, "data: ", data);
	return new Promise((resolve, reject) => {
		uni.request({
			url: "https://www.qsc.zju.edu.cn/zjurs/api/" + url,
			data: data,
			method: method,
			success: ({ data }) => {
				const ret = data;
				if (ret.code !== 0 && ret.code !== 50000) {
					switch (ret.code) {
						case 10001:
							uni.showToast({
								title: "权限不足",
								icon: "error",
							});
						break;
						case 10002:
							uni.showToast({
								title: "用户名错误",
								icon: "error",
							});
						break;
						case 10003:
							uni.showToast({
								title: "密码错误",
								icon: "error",
							});
						break;
						case 10005:
							uni.showToast({
								title: "未登录",
								icon: "error",
							});
						break;
						case 50000:
							uni.showToast({
								title: "服务器错误",
								icon: "error",
							});
						break;
						default:
							uni.showToast({
								title: task + "失败",
								icon: "error",
							});
						break;
					}
					console.log(task + ": ", ret);
					reject(task + "失败");
				} else {
					resolve(ret.data);
				}
			},
			fail(e) {
				uni.showToast({
					title: task + "出错",
					icon: "error",
				});
				console.log(e);
				reject(e);
			},
		});
	});
}

export default request;