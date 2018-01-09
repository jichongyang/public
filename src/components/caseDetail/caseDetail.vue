<template>
		<div id="caseDetailWrap">
				<div class="topBox">
						<div class="contWrap">
								<span class="txWrap">
									<img :src="casedetail.touxiang" class="tx">
									<img src="./vv.png" class="v" v-if="casedetail.law_renz==1">
								</span>
								<img src="./start.png" class="tag" v-if="casedetail.hh_type==1">
								<div class="box1">
										<span class="time">{{casedetail.time}}</span>
										<span class="name hidden">{{casedetail.name}}</span>
										<span class="price" v-if="casedetail.pay_type==1">¥{{casedetail.pay_money}}</span>
								</div>
								<p class="box2">{{casedetail.content}}</p>
								<div class="box3">
										<span class="green" v-if="casedetail.type==1">电话咨询</span>
										<span class="sp1" v-if="casedetail.leixing!=''">{{casedetail.leixing}}</span>
										<span class="sp2">来源：{{casedetail.laiyuan}}</span>
										<span class="sp3" v-if="casedetail.hh_xuqiudz!=''">需求地址：{{casedetail.hh_xuqiudz}}</span>
								</div>
						</div>
						<button class="qd" v-if="casedetail.hh_type==0&&casedetail.lawyername==''" :class="canQd?'':'fail'" @click="qdFunc">抢单</button>
						<p class="alreay" v-if="casedetail.lawyername!=''"><span>{{casedetail.lawyername}}律师</span>已抢单!</p>
						<p class="btmMess" v-if="casedetail.hh_type==1">正在寻找匹配需求的律师，请您耐心等待......</p>
				</div>
				<div class="pop" v-show="isSuccess">
						<div class="popbox">
								<img src="./pop-sec.png">
								<span>抢单成功</span>
								<div>
										<button @click="returnback">返回</button>
										<button style="color: #1978d0;border-left: 1px solid #c8c8c8;" @click="gotoDetail">去回答问题</button>
								</div>
						</div>
				</div>
				<error-pop :getdata="errorPopCont" v-if="isError"></error-pop>
		</div>
</template>
<script>
		import dataUrl from '../../../static/js/urls.json'
		//import errorCode from '@/components/errorCode/errorCode'
		import bus from '../../bus'
		import loading from '@/components/loading/loading'
		import errorPop from '@/components/errorPop/errorPop'
		
		export default {
				components: {
						errorPop
				},
				data() {
						return {
								caseid: '',
								casesource: '',
								infoid: '',
								casedetail: '',
								canQd: true,//能否抢单
								isSuccess: false,//是否抢单成功
								/*错误码处理*/
								isError: false,
								errorPopCont: ''
						}
				},
				methods: {
						setHeight() {
						},
						init() {
								var thisInfoid = sessionStorage.getItem('infoid')
								var caseid = sessionStorage.getItem('caseid')
								var casesource = sessionStorage.getItem('casesource')
								this.caseid = caseid
								this.casesource = casesource
								this.infoid = thisInfoid
								if (thisInfoid == undefined) {
										this.$router.push({path: '/'})
								}
								var url = dataUrl.url + '/xiangqing'
								var params = new FormData()
								this.infoid = sessionStorage.getItem('infoid')
								var start = (this.currentPageNum - 1) * this.pageSize1
								this.start = (this.pagenum - 1) * this.length
								params.append('id', caseid)
								params.append('source', casesource)
								var that = this
								this.$axios.post(url, params).then(function (res) {
										var data = res.data.data
										that.casedetail = data
								})
						},
						//抢单
						qdFunc() {
								if (this.canQd == true) {
										var url = dataUrl.url + '/qiangdan'
										var params = new FormData()
										params.append('infoid', this.infoid)
										params.append('id', this.caseid)
										params.append('source', this.casesource)
										var that = this
										this.$axios.post(url, params).then(function (res) {
												var code = res.data.code
												if (code != 200) {
														that.canQd = false
														that.isError = true
														that.errorPopCont = res.data.msg
														setTimeout(function () {
																that.isError = false
																that.errorPopCont = ''
																that.$router.push("/caseLists")
														}, 1500)
														that.isSuccess = false
												} else {
														that.isSuccess = true
												}
										})
								}
						},
						//返回
						returnback() {
								this.$router.push({path: '/caseLists'})
						},
						//了解详情
						gotoDetail() {
								if (this.casedetail.type == 1) {
										this.$router.push({path: '/telZixun'})
								} else {
										this.$router.push({path: '/chating'})
								}
						}
				},
				mounted() {
						this.init()
				},
		}
</script>
<style scoped>
		#caseDetailWrap {
				width: 100%;
				height: auto;
				padding-bottom: 40px;
				
		}
		
		#caseDetailWrap .topBox {
				width: 100%;
				padding-top: 57px;
				overflow: hidden;
		}
		
		#caseDetailWrap .topBox .contWrap {
				width: 96%;
				height: auto;
				background: #ffffff;
				box-shadow: 0 2px 4px 0 rgba(165, 165, 165, 0.50);
				float: left;
				margin-left: 2%;
				position: relative;
				padding-top: 33px;
		}
		
		#caseDetailWrap .topBox .contWrap .txWrap {
				width: 58px;
				height: 58px;
				border-radius: 100px;
				position: absolute;
				left: 50%;
				top: 0;
				margin-top: -29px;
				margin-left: -29px;
		}
		
		#caseDetailWrap .topBox .contWrap .txWrap .tx {
				width: 58px;
				height: 58px;
				border-radius: 100px;
		}
		
		#caseDetailWrap .topBox .contWrap .txWrap .v {
				width: 18px;
				position: absolute;
				right: 0;
				bottom: 0;
		}
		
		#caseDetailWrap .topBox .contWrap .tag {
				width: 32px;
				position: absolute;
				left: 0;
				top: 0;
		}
		
		#caseDetailWrap .topBox .contWrap .box1 {
				width: 90%;
				height: 30px;
				margin-left: 5%;
		}
		
		#caseDetailWrap .topBox .contWrap .box1 .time {
				width: 100px;
				height: 30px;
				float: left;
				text-align: left;
				font-size: 1.2rem;
				color: #777274;
				line-height: 30px;
		}
		
		#caseDetailWrap .topBox .contWrap .box1 .name {
				width: calc(100% - 200px);
				height: 30px;
				float: left;
				text-align: center;
				font-size: 1.4rem;
				color: #231f20;
				line-height: 30px;
		}
		
		#caseDetailWrap .topBox .contWrap .box1 .price {
				width: 100px;
				height: 30px;
				float: right;
				text-align: right;
				font-size: 2rem;
				color: #ff7777;
				line-height: 30px;
		}
		
		#caseDetailWrap .topBox .contWrap .box2 {
				width: 90%;
				height: auto;
				margin-left: 5%;
				font-size: 1.4rem;
				color: #231f20;
				line-height: 23px;
				text-align: justify;
				padding-bottom: 20px;
		}
		
		#caseDetailWrap .topBox .contWrap .box3 {
				width: 100%;
				background: #f6f6f6;
				height: auto;
				font-size: 1.4rem;
				color: #231f20;
				line-height: 23px;
				text-align: justify;
				padding: 13px 0;
				overflow: hidden;
		}
		
		#caseDetailWrap .topBox .contWrap .box3 .sp1 {
				float: left;
				height: 18px;
				line-height: 18px;
				padding: 0 5px;
				margin-left: 5%;
				background: rgba(0, 0, 0, 0.05);
				font-size: 1.1rem;
				color: #364c8b;
		}
		
		#caseDetailWrap .topBox .contWrap .box3 .green {
				float: left;
				height: 18px;
				line-height: 18px;
				padding: 0 5px;
				margin-left: 5%;
				background: rgba(0, 0, 0, 0.05);
				font-size: 1.1rem;
				color: #61ac0e;
		}
		
		#caseDetailWrap .topBox .contWrap .box3 .sp2 {
				float: right;
				height: 18px;
				line-height: 18px;
				margin-right: 5%;
				font-size: 1.1rem;
				color: #646363;
		}
		
		#caseDetailWrap .topBox .contWrap .box3 .sp3 {
				width: calc(90% - 22px);
				float: left;
				height: 18px;
				line-height: 18px;
				margin-left: 5%;
				font-size: 1.1rem;
				color: #646363;
				margin-top: 10px;
				background: url(./address.png) no-repeat left center;
				background-size: auto 18px;
				padding-left: 22px;
		}
		
		#caseDetailWrap .qd {
				width: 38%;
				height: 38px;
				line-height: 38px;
				float: left;
				margin-left: 31%;
				margin-top: 36px;
				background: #1978d0;
				box-shadow: 0 2px 4px 0 rgba(25, 120, 208, 0.31);
				font-size: 1.4rem;
				color: #ffffff;
		}
		
		#caseDetailWrap .alreay {
				width: 100%;
				height: 38px;
				line-height: 38px;
				float: left;
				text-align:center;
				margin-top: 36px;
				font-size: 1.6rem;
				letter-spacing:2px;
		}
		
		#caseDetailWrap .qd.fail {
				background: #e3e3e3;
				box-shadow: 0 2px 4px 0 rgba(203, 203, 203, 0.31);
		}
		
		#caseDetailWrap .btmMess {
				width: 100%;
				font-size: 1.4rem;
				color: #8b572a;
				float: left;
				margin-top: 31px;
		}
		
		/*成功弹窗*/
		#caseDetailWrap .pop {
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 2;
				background: rgba(0, 0, 0, 0.5)
		}
		
		#caseDetailWrap .pop .popbox {
				width: 68%;
				height: 174px;
				position: absolute;
				left: 16%;
				top: 50%;
				margin-top: -80px;
				background: #ffffff;
		}
		
		#caseDetailWrap .pop .popbox img {
				width: 50px;
				position: absolute;
				left: 50%;
				top: -25px;
				margin-left: -25px;
				
		}
		
		#caseDetailWrap .pop .popbox span {
				width: 100%;
				height: 123px;
				line-height: 124px;
				float: left;
				font-size: 1.5rem;
				color: #2dcb73;
		}
		
		#caseDetailWrap .pop .popbox div {
				width: 100%;
				height: 50px;
				float: left;
				background: #f6f6f6;
		}
		
		#caseDetailWrap .pop .popbox div button {
				width: 50%;
				float: left;
				background: none;
				font-size: 1.4rem;
				color: #666666;
				height: 20px;
				line-height: 20px;
				margin-top: 15px;
				box-sizing: border-box;
				
		}
</style>