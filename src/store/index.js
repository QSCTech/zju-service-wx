import Vue from "vue";
import Vuex from "vuex";
import request from "../common/request";
import * as Sentry from "sentry-uniapp";

Vue.use(Vuex);

export default new Vuex.Store({
/*
state: {
	serverAddr: "https://cyzz.fun/lcs/",
	loginUser: {
		type: null,
		id: "",
		username: "",
		password: "",
		role: null,
		hasLogin: false,
	},
},

mutations: {
	setLoginUser(state, user) {
		state.loginUser = user;
	},
},
*/
actions: {
	wxLogin() {
		return new Promise((resolve, reject) => {
			uni.login({
				success(res) {
					const code = res.code;
					resolve(code);
				},
				fail(e) {
					reject(e);
				},
			});
		});
	},
	
    login({commit}, code) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: "https://www.qsc.zju.edu.cn/zjurs/api/wx/login?code=" + code,
				data: null,
				method: "POST",
				success: ({ data, cookies }) => {
					const ret = data;
					if (ret.code !== 0) {
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
						ret.data.cookies = cookies;
						if(ret.data.name !== "Unknown"){
							Sentry.configureScope((scope) => {
							  scope.setUser({ id: ret.data.zjuId });
							});
							Sentry.captureMessage("login");
						}
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
    },
},

});