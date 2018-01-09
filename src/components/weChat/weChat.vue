<template>
		<div class="weChatwrap">
				<div class="wrap" v-if="!this.showCode">
				     <img src="./logo.jpg" alt="">
						<div class="text">
								绑定中国信息协会法律分会公众号。
								<br>
								公众号可以推送消息及时提醒您回复用户。
						</div>
						<button type="button" class="openWeChat" @click="openWeChat">
								确定绑定
						</button>
				</div>
				<div class="qrCode" @click="closeCode" v-if="this.showCode">
						<div class="code" v-if="this.isshowMsg">
								<img src="./guanzhu.jpg" alt="">
								<p>
										长按扫码二维码。关注成功后，请点击左上角"<strong>返回</strong>"进入绑定页面。
										<br>
										再次点击绑定
								</p>
						</div>
						<div class="alreayCode" v-if="!this.isshowMsg">
								<p>{{this.showMsg}}</p>
								<button @click="gotoLogin">我知道了</button>
						</div>
				
				</div>
		</div>
</template>
<script>
		import dataUrl from '../../../static/js/urls.json'
		
		export default {
				data() {
						return {
								showCode: false,//显示关注
								isshowMsg: false,//显示提示框
								showMsg: "",//提示内容
						}
				},
				methods: {
						//点击确定绑定按钮
						openWeChat() {
								//为关注弹出二维码
								this.showCode = true;
								this.isshowMsg = true;
								return false;
								//验证用户是否存在 openid 跳转页面去获取
								if (!sessionStorage.getItem('openid')) {
										window.location.href = dataUrl.url + '/wxLogin?username=' + sessionStorage.getItem('username')
								}
								//用户是否已经关注公众号
								if (sessionStorage.getItem("subscribe") == 1) {
										var that = this;
										let url = dataUrl.url + '/wxBinding';
										let params = new FormData();
										params.append('username', sessionStorage.getItem('username'));
										this.$axios.post(url, params).then(function (res) {
												that.showCode = true;
												that.isshowMsg = false;
												sessionStorage.setItem("wx_openid", sessionStorage.getItem('openid'))
												that.showMsg = res.data.msg;//显示回调
										})
										
								} else {
										//为关注弹出二维码
										this.showCode = true;
										this.isshowMsg = true;
								}
						},
						closeCode(e) {
								window.event ? window.event.returnValue = false : e.preventDefault();
								this.showCode = false;
								this.isshowMsg = false;
								this.getWxUserInfo()
						},
						gotoLogin() {
								this.$router.push("/caseLists");
						},
						//获取微信用户信息--公众号关注状态
						getWxUserInfo() {
								var that = this
								let url = dataUrl.url + '/wxUserInfo';
								let params = new FormData()
								params.append('username', sessionStorage.getItem('username'))
								this.$axios.post(url, params).then(function (res) {
										if (res.data.code == 200) {
												sessionStorage.setItem("subscribe", res.data.data.subscribe)
												sessionStorage.setItem("openid", res.data.data.openid)
										}
								})
						}
				},
				
				mounted() {
						this.getWxUserInfo()
				}
		}
</script>
<style lang="" scoped>
		.weChatwrap {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				bottom: 0;
				background: #ffffff;
		}
		
		.weChatwrap .wrap {
				width: 100%;
				height: 100%;
				position: relative;
				padding-top:20%;
                box-sizing:border-box;
		}
		
		.weChatwrap .wrap .text {
				width: 70%;
				font-size: 1.6rem;
				margin: 0 auto;
				height: 9.2rem;
				line-height: 2.9rem;
				overflow: hidden;
				text-align: left;
		}
		
		.weChatwrap .wrap .openWeChat {
				font-size: 1.6rem;
				width: 70%;
				margin: 0 auto;
				padding: 10px 0;
				background: #6db048;
				color: #ffffff;
				border-radius: 6px;
				position: absolute;
				bottom: 8rem;
				left: 15%;
		}
		
		.weChatwrap .qrCode {
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.5);
				text-align: center;
				position: relative;
				
		}
		
		.weChatwrap .qrCode .code {
				position: absolute;
				top: 40%;
				left: 50%;
				height: auto;
				width: 80%;
				max-width: 80%;
				margin: -45% 0 0 -40%;
				background: #ffffff;
				border-radius: 4px;
				
				padding-bottom: 2rem;
		}
		
		.weChatwrap .qrCode .code img {
				width: 100%;
		}
		
		.weChatwrap .qrCode .code p {
				width: 90%;
				font-size: 1.6rem;
				line-height: 1.8rem;
				height: 5.6rem;
				overflow: hidden;
				text-align: left;
				margin-left: 5%;
		}
		
		.weChatwrap .qrCode .code strong {
				color: red;
		}
		
		.weChatwrap .alreayCode {
				width: 80%;
				height: 160px;
				background: #ffffff;
				position: absolute;
				left: 10%;
				top: 30%;
				border-radius: 5px;
		}
		
		.weChatwrap .alreayCode p {
				width: 90%;
				margin: 0 5%;
				line-height: 24px;
				padding: 30px 0;
				display: block;
				text-align: center;
				color: red;
				font-size: 1.6rem;
		}
		
		.weChatwrap .alreayCode button {
				width: 40%;
				height: 40px;
				line-height: 40px;
				font-stretch: 1.5rem;
				border-radius: 5px;
				color: #ffffff;
				background: #1978d0;
		}
</style>