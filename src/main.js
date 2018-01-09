// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import WebIM from 'WebIM'
import bus from './bus'
import dataUrl from '../static/js/urls.json'

Vue.config.productionTip = false

axios.defaults.withCredentials = true
Vue.prototype.$axios = axios


//设置cookie 默认储存一天
function setCookie(c_name, value, expiredays = 86400000) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

Vue.prototype.setCookie = setCookie

//获取cookie、
function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
				return (arr[2]);
		else
				return null;
}

Vue.prototype.getCookie = getCookie;

//删除cookie
function delCookie(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if (cval != null)
				document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

Vue.prototype.delCookie = delCookie

router.beforeEach((to, from, next) => {
		if (to.matched.some(m => m.meta.auth)) {
				
				var urls = ['/login', '/caseLists', '/allZixun', '/caseDetail', '/zixunDetail', '/telZixun', '/chating', '/weChat'];
				if (urls.indexOf(to.fullPath) >= 0) {
						var token = getCookie('token')
						//登录验证
						let urltoken = dataUrl.url + '/getLogin'
						axios.post(urltoken, {}, {
								headers: {
										'auth-signature': token
								}
						}).then(function (res) {
								if (res.data.code == 200) {
										var resdata = res.data.data
										sessionStorage.setItem("username", resdata.username)
										sessionStorage.setItem("infoid", resdata.infoid)
										sessionStorage.setItem("userid", resdata.userid)
										sessionStorage.setItem('wx_openid', resdata.wx_openid)
										if (resdata.openid != undefined) {
												sessionStorage.setItem("openid", resdata.openid)
										}
										if (resdata.subscribe != undefined) {
												sessionStorage.setItem("subscribe", resdata.subscribe)
										}
										switch (to.fullPath) {
												case '/login':
														next({path: '/caseLists'})
														break;
												
										}
										next()
								} else {
										delCookie('token')
										console.log(from.fullPath + '-----' + to.fullPath)
										if (to.fullPath == '/login') {
												next()
										} else {
												next({path: '/login'})
										}
								}
						})
				} else {
						console.log(from.fullPath + '-----' + to.fullPath)
						next()
				}
		} else {
				next()
		}
})

// 环信相关的
var im = new WebIM.connection({
		isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
		https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
		url: WebIM.config.xmppURL,
		isAutoLogin: true,
		heartBeatWait: WebIM.config.heartBeatWait,
		autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
		autoReconnectInterval: WebIM.config.autoReconnectInterval,
		apiUrl: WebIM.config.apiURL
});
//回调监听
im.listen({
		onOpened: function (message) {          //连接成功回调，连接成功后才可以发送消息
				//如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
				// 手动上线指的是调用conn.setPresence(); 在本例中，conn初始化时已将isAutoLogin设置为true
				// 所以无需调用conn.setPresence();
				console.log("%c [opened] 连接已成功建立", "color: green")
		},
		/**
		 * 收到文本消息
		 * @param message
		 */
		onTextMessage: function (message) {
				//屏蔽历史消息触发 新消息
				if (message.delay) return false;
				bus.$emit('onTextMessage', message)
		},
		onPictureMessage: function (message) {
				//屏蔽历史消息触发 新消息
				if (message.delay) return false;
				bus.$emit('onPictureMessage', message)
		}, //收到图片消息
		onPresence: function (message) {
		
		},//收到联系人订阅请求（加好友）、处理群组、聊天室被踢解散等消息
		/**
		 * 失败回调
		 * @param message
		 */
		onError: function (message) {
				bus.$emit('onError', message)
				if (message.type === 8) {
						//alert("您已在别处登录，请刷新网页重新登录")
				}
		}
})
Vue.prototype.$im = im
/* eslint-disable no-new */
new Vue({
		el: '#app',
		router,
		template: '<App/>',
		components: {App}
})
