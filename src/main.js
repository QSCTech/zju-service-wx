import Vue from 'vue';
import App from './App';
import store from './store';
import "./wxcomponents/weapp-cookie/weapp-cookie.es";
import * as Sentry from "sentry-uniapp";

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store;

const app = new Vue({
  ...App
})
app.$mount()

Sentry.init({
  dsn: "https://92c47f620e7640798f3129d4e18f05a7@www.qsc.zju.edu.cn/sentry/6",
});