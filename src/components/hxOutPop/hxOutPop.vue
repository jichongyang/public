<template>
		<div id="hxPop">
				<div>
						<p>您的帐号已在别处登录，请重新登录</p>
						<button @click="gotoLogin">我知道了</button>
				</div>
		</div>
</template>
<script>
		import dataUrl from '../../../static/js/urls.json'
		
		export default {
				data() {
						return {}
				},
				methods: {
						gotoLogin() {
								sessionStorage.clear()
								//用户退出
								let urltoken = dataUrl.url + '/loginout'
								var token = this.getCookie('token')
								this.$axios.post(urltoken, {}, {
										headers: {
												'auth-signature': token
										}
								}).then(function (res) {
								
								})
								this.delCookie('token')
								this.$router.push({path: '/'})
						}
				},
				mounted() {
				}
		}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
		#hxPop {
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 10000;
				background: rgba(0, 0, 0, 0.5)
		}
		
		#hxPop div {
				width: 80%;
				height: 160px;
				background: #ffffff;
				position: absolute;
				left: 10%;
				top: 30%;
				border-radius: 5px;
		}
		
		#hxPop p {
				width: 90%;
				margin: 0 5%;
				line-height: 24px;
				padding: 30px 0;
				display: block;
				text-align: center;
				color: red;
				font-size: 1.6rem;
		}
		
		#hxPop button {
				width: 40%;
				height: 40px;
				line-height: 40px;
				font-stretch: 1.5rem;
				border-radius: 5px;
				color: #ffffff;
				background: #1978d0;
		}
</style>