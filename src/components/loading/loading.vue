<template>
		<div id="loadingWrap">
				<div>
						<img src="./loading.gif">
						<span>{{cont}}</span>
				</div>
		</div>
</template>
<script>
		export default {
				props: ['loadCont'],//loading的内容
				data() {
						return {
								cont: ''
						}
				},
				methods: {
						setCont() {
								this.cont = this.loadCont
						}
				},
				mounted() {
						this.setCont()
				}
		}
</script>
<style>
		#loadingWrap {
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				background: rgba(0, 0, 0, 0.6);
				z-index: 99999;
		}
		
		#loadingWrap div {
				text-align: center;
				width: 100%;
				height: 200px;
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -100px;
		}
		
		#loadingWrap div img {
				width: 80px;
		}
		
		#loadingWrap div span {
				width: 100%;
				display: block;
				font-size: 15px;
				color: #ffffff;
				padding-top: 10px;
		}
</style>
