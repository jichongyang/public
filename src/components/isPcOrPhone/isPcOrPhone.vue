<template>
		<div id="judge">
		
		</div>
</template>
<script>
		export default {
				methods: {
						//判断是手机还是pc
						browserRedirect() {
								var sUserAgent = navigator.userAgent.toLowerCase();
								var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
								var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
								var bIsMidp = sUserAgent.match(/midp/i) == "midp";
								var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
								var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
								var bIsAndroid = sUserAgent.match(/android/i) == "android";
								var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
								var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
								if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
										window.location.href = 'http://www.lvjinhui.cn'
								} else {
										this.$router.push({path: '/login'})
								}
						}
				},
				created() {
						this.browserRedirect()
				}
		}
</script>
<style scoped>
		html {
				width: 100%;
				height: 100%;
		}
		
		body {
				width: 100%;
				height: 100%;
		}
		
		#judge {
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				background: #ffffff;
		}
</style>