<template>
		<div id="errorCommonPop">
				<p>{{this.getdata}}</p>
		</div>
</template>
<script>
		export default {
				
				data() {
						return {
								getdata: "您的账号需要从新登陆！"
						}
				},
				methods: {},
				mounted() {
				}
		}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
		#errorCommonPop {
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 10000;
		}
		
		#errorCommonPop p {
				/*width:auto;*/
				min-width: 50%;
				max-width: 90%;
				display: block;
				padding: 20px 20px;
				text-align: center;
				color: #ffffff;
				background: rgba(0, 0, 0, 0.7);
				position: absolute;
				left: 50%;
				top: 30%;
				transform: translateX(-50%);
				border-radius: 5px;
				font-size: 1.5rem;
				line-height: 20px;
		}
</style>