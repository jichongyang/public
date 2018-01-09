<template>
		<div id="telZixunWrap">
				<div class="cont">
			<span class="lt">
				<img :src="detailData.touxiang" />
			</span>
						<div class="rt">
								<div class="box1">
										<span class="name">{{detailData.name}}</span>
										<span class="tel">{{detailData.tel}}</span>
										<span class="time">{{detailData.time}}</span>
								</div>
								<p>{{detailData.content}}</p>
								<span class="type" v-if="detailData.type==1">电话咨询</span>
								<span class="tag" v-if="detailData.leixing!=''">{{detailData.leixing}}</span>
								<span class="price" v-if="detailData.pay_type==1">¥{{detailData.pay_money}}</span>
						</div>
				</div>
				<button><a :href="'tel:'+detailData.tel">联系咨询人</a></button>
		</div>
</template>
<script>
		import dataUrl from '../../../static/js/urls.json'
		import bus from '../../bus'
		import loading from '@/components/loading/loading'
		
		export default {
				data() {
						return {
								detailData: ''
						}
				},
				methods: {
						setHeight() {
						},
						init() {
								var that = this
								var thisInfoid = sessionStorage.getItem('infoid')
								if (thisInfoid == undefined) {
										this.$router.push({path: '/'})
								}
								var url = dataUrl.url + '/myanyuanxq'
								var params = new FormData()
								this.infoid = sessionStorage.getItem('infoid')
								var id = sessionStorage.getItem('caseid')
								var source = sessionStorage.getItem('casesource')
								params.append('infoid', thisInfoid)
								params.append('id', id)
								params.append('source', source)
								this.$axios.post(url, params).then(function (res) {
										that.detailData = res.data.data
										//that.isShowLoading = false
								})
						}
				},
				mounted() {
						this.init()
				},
		}
</script>
<style scoped>
		#telZixunWrap {
				width: 100%;
				height: auto;
				padding-bottom: 70px;
		}
		
		#telZixunWrap .cont {
				width: 100%;
				height: auto;
				background: #ffffff;
				box-shadow: 0 2px 6px 0 #efeeee;
				overflow: hidden;
				padding-top: 6px;
		}
		
		#telZixunWrap .cont .lt {
				width: 31px;
				height: 31px;
				float: left;
				margin-left: 12px;
				border-radius: 100px;
				background: #f3f3f3;
				overflow: hidden;
		}
		
		#telZixunWrap .cont .lt img {
				width: 100%;
				height: 100%;
				float: left;
		}
		
		#telZixunWrap .cont .rt {
				width: calc(100% - 62px);
				height: auto;
				float: right;
				margin-right: 12px;
				overflow: hidden;
				padding-bottom: 6px;
		}
		
		#telZixunWrap .cont .rt .box1 {
				width: 100%;
				height: 20px;
				float: left;
		}
		
		#telZixunWrap .cont .rt .box1 span {
				float: left;
		}
		
		#telZixunWrap .cont .rt .box1 span.name {
				font-size: 1.4rem;
				color: #231f20;
				margin-right: 14px;
				line-height: 20px;
		}
		
		#telZixunWrap .cont .rt .box1 span.tel {
				font-size: 1.2rem;
				color: #231f20;
				line-height: 20px;
		}
		
		#telZixunWrap .cont .rt .box1 span.time {
				font-size: 1.1rem;
				color: #777274;
				float: right;
				line-height: 20px;
		}
		
		#telZixunWrap .cont .rt p {
				width: 100%;
				font-size: 1.5rem;
				color: #231f20;
				line-height: 23px;
				text-align: justify;
				margin: 2px 0 6px;
		}
		
		#telZixunWrap .cont .rt .come {
				width: 100%;
				font-size: 1.1rem;
				color: #646363;
				float: left;
				text-align: left;
		}
		
		#telZixunWrap .cont .rt .type {
				height: 18px;
				line-height: 18px;
				font-size: 1.1rem;
				color: #61ac0e;
				float: left;
				text-align: center;
				padding: 0 5px;
				background: #f2f2f2;
				margin-top: 6px;
				margin-right: 4px;
		}
		
		#telZixunWrap .cont .rt .tag {
				height: 18px;
				line-height: 18px;
				font-size: 1.1rem;
				color: #364c8b;
				float: left;
				text-align: center;
				padding: 0 5px;
				background: rgba(54, 76, 139, 0.05);
				margin-top: 6px;
				margin-right: 4px;
		}
		
		#telZixunWrap .cont .rt .price {
				height: 18px;
				line-height: 18px;
				font-size: 1.8rem;
				color: #ff7777;
				float: left;
				text-align: center;
				margin-top: 6px;
				background: url(./pay.png) no-repeat left top;
				background-size: auto 18px;
				padding-left: 36px;
		}
		
		#telZixunWrap button a {
				display: block;
				width: 38%;
				height: 36px;
				line-height: 36px;
				position: fixed;
				left: 31%;
				bottom: 30px;
				background-image: linear-gradient(90deg, #2a72ff 0%, #4a88f8 100%);
				box-shadow: 0 2px 6px 0 #6a9dfe;
				border-radius: 100px;
				font-size: 1.4rem;
				color: #ffffff;
		}
</style>