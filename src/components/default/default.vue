<template>
		<div id="caseListWrap">
				<div class="swiper-container">	
				<div class="swiper-wrapper">
				   <div class="swiper-slide">
				      <img src="./banenr.jpg" alt="" class="banner">
				   </div>
				    <div class="swiper-slide">
				      <img src="./banenr.jpg" alt="" class="banner">
				   </div>
				    <div class="swiper-slide">
				      <img src="./banenr.jpg" alt="" class="banner">
				   </div>
				   
				</div>
				 <div class="swiper-pagination swiper-pagination-white"></div>
				</div>
						<ul class="listsWrap">
								<li class="list" v-for="(item,index) in caselists" @click="gotodetail(item.id,item.laiyuan,item.anyuan_type)">
										<div class="lt">
												<img src="./start.png" class="ltTag" v-if="item.hh_type==1">
												<span>
														<img :src="item.touxiang" class="tx">
														<img src="./vv.png" class="v" v-if="item.law_renz==1">
												</span>
										</div>
										<div class="rt">
												<div class="div1">
														<span class="name hidden">{{item.name}}</span>
														<span class="time">{{item.time}}</span>
														<span class="grab" v-if="item.anyuan_type==1">已抢单</span>
														<span class="price" v-if="item.pay_type==1?true:false">¥{{item.pay_money}}</span>
												</div>
												<p>{{item.content}}</p>
												<span class="green" v-if="item.type==1">电话咨询</span>
												<span class="tag" v-if="item.leixing!=''">{{item.leixing}}</span>
												<span class="come">{{item.laiyuan}}</span>
										</div>
								</li>
						</ul>
                
				<img src="./weixin.png" alt="" class="openWeChat" @click="openBind" v-show="isweixin">
				<img src="./pop-select.png" class="openPop" @click="openSltComes" v-show="isShowSltBtn">
				<div class="sltPop" v-show="isShowSltCome" @click="hidePop">
						<div class="popCont">
								<h3>筛选来源</h3>
								<div :style="{'height':choices.length*40+'px'}">
										<ul>
												<li v-for="(item,index) in choices" @click="sltComeFunc(index)" :class="sltNum==index?'ckd':''">
														<span>{{item}}</span>
												</li>
										</ul>
								</div>
						
						</div>
				</div>
				<div class="empty" v-if="this.caseCount==0&&this.caselists==''">
						<div>
								<img src="./except2.png">
								<span>— 案子被抢光了 —</span>
						</div>
				</div>
				<div class="btmTab">
						<button style="color: #1569b8;font-weight:bold;">案源广场</button>
						<button style="border-left: 1px solid rgba(151,151,151,0.41);" @click="tabItem">全部咨询</button>
				</div>
				<div class="loginBack" v-if="this.isLogin" @click.prevent ="hideLogin">
				   <div class="loginContent" v-if="!this.showCode">
				        <p>需要登录律金汇OS联系群主或工作人员开通权限，<a href="#" @click.stop="showLogin">立即联系</a></p>
						<span @click.stop="pushLogin">已有账号>></span>
				   </div>
				   <div class="loginCode" v-if="this.showCode">
				     <img src="./codeimg.jpg" alt="">
				   </div>
				</div>
		</div>
</template>
<script>
		import dataUrl from '../../../static/js/urls.json'
		import bus from '../../bus'
		import loading from '@/components/loading/loading'
		 import Swiper from 'swiper';
         import '../../../static/css/swiper-3.3.1.min.css';
		export default {
				data() {
						return {
								caselists: [],//数据列表数组
								caseCount: 1,//案源数量
								isShowSltBtn: true,//是否显示打开弹窗的按钮
								isShowSltCome: false,//是否显示少选弹窗
								choices: [],//筛选选项
								sltType: '',//筛选选中的条件
								sltNum: 0,//筛选选中的条件的index
								pagenum: 1,//开始的页码
								start: 0,//开始的开始位置
								length: 20,//显示长度
								sltCome: '',//咨询来源
								pageEnd: '',
								flag: false,
								isactivated: false,//activated使用状态 true使用中 false未使用
								isweixin: false,//是否显示微信绑定
								isLogin:false,//是否显示联系工作人员
								showCode:false//显示二维码
						}
				},
				methods: {
					hideLogin(){
						this.isLogin=false;
						this.showCode=false;
					},
					showLogin(){
						this.showCode=true;
					},
					pushLogin(){
						this.$router.push('/login')
					   },
						setHeight() {
						},
						//获取来源的列表
						getComes() {
								var url = dataUrl.url + '/anyuaninfo'
								var params = new FormData()
								var that = this
								this.$axios.post(url, params).then(function (res) {
										var data = res.data.data
										that.choices = data.sourceList
										that.choices.splice(0, 0, "全部")
								})
						},
						//初始化列表
						init() {
								//获取案源
								this.getList()
						},
						//点击微信绑定
						openBind() {
								if(sessionStorage.getItem('openid')){
										this.$router.push("/weChat");
								}else{
										window.location.href = dataUrl.url + '/wxLogin?username=' + sessionStorage.getItem('username')
								}
						},
						//打开筛选来源
						openSltComes() {
								this.isShowSltCome = true
								this.isShowSltBtn = false
						},
						//选择来源
						sltComeFunc(i) {
								this.caseCount = 1;
								this.sltNum = i
								this.isShowSltCome = false
								this.isShowSltBtn = true
								if (i == 0) {
										this.sltCome = ''
								} else {
										this.sltCome = this.choices[i]
								}
								this.pagenum = 1
								this.caselists = []
								this.getList()
						},
						hidePop() {
								this.isShowSltCome = false
								this.isShowSltBtn = true
						},
						//进入详情抢单
						gotodetail(id, source,alreay) {
								console.log(id,source)
								if(alreay==1){
                                    return false;
								}else{
									var token = this.getCookie('token')
									//登录验证
									var that=this;
									let urltoken = dataUrl.url + '/getLogin'
									this.$axios.post(urltoken, {}, {
											headers: {
													'auth-signature': token
											}
									}).then(function (res) {
											if (res.data.code == 200) {
												console.log(res.data.data)
													var resdata = res.data.data
													sessionStorage.setItem('caseid', id);
													 sessionStorage.setItem('casesource', source)
													 that.$router.push({path: '/caseDetail'})
				  
													}else{
														that.isLogin=true;
													}
									})
									
									
								}
								
						},
						//获取列表
						getList() {
							
								let url = dataUrl.url + '/anyuanlb';
								let params = new FormData()
								this.infoid = sessionStorage.getItem('infoid')
								params.append('start', this.start)
								params.append('length', this.length)
								params.append('wfufei', '')
								params.append('wliexing', '')
								params.append('wlaiyan', this.sltCome)
								var that = this
								this.$axios.post(url, params).then(function (res) {
												var data = res.data.data
											that.caselists=data.list;
										
								})
						},
						
						tabItem() {
								this.$router.push("/allZixun")
								this.sltNum = 0;
						},
						//环信--登录
						loginHX() {
								var that = this
								var username = sessionStorage.getItem('username')
								if (username == 'null') {
										that.$router.push("/login")
								}
								this.$im.open({
										apiUrl: WebIM.config.apiURL,
										user: username,
										pwd: '123456',
										appKey: WebIM.config.appkey,
										success: function (data) {
												bus.$emit('LoginSuccess', true)
										},
										error: function (err) {
												//console.log(err)
												that.loginRegHX(username)
										}
								})
						},
						/**
						 * 环信--用户注册
						 * @param username 用户名
						 * @param source 来源
						 */
						loginRegHX(username) {
								var that = this
								var options = {
										username: username,
										password: '123456',
										nickname: username,
										appKey: WebIM.config.appkey,
										success: function (msg) {
												that.loginHX()
										},
										error: function (err) {
												//错误发送邮件
												var url = dataUrl.url + '/useHxErr'
												var params = new FormData()
												params.append('title', '[律金汇OS-手机端][新律师注册]错误')
												params.append('describe', 'vue律金汇OS新律师注册错误')
												params.append('hxreturn', JSON.stringify(err))
												that.$axios.post(url, params).then(function (res) {
												
												})
										},
										apiUrl: WebIM.config.apiURL
								};
								this.$im.registerUser(options);
						},
						//环信--加载
						loadHX() {
								bus.$on('onTextMessage', (msg) => {
										this.getList();
								})
								bus.$on('onPictureMessage', (msg) => {
										this.getList();
								})
								bus.$on('onError', (msg) => {
										if (msg.type === 8) {
												this.$router.push("/hxOutPop")
										}
								})
						},
						//环信--卸载
						uninstallHX() {
								bus.$off('onTextMessage')
								bus.$off('onPictureMessage')
						}
						
				},
				mounted() {
						this.getComes()
						this.init()
						this.loginHX()
						//验证是否微信浏览器打开
						var ua = navigator.userAgent.toLowerCase();
						if (ua.match(/MicroMessenger/i) == "micromessenger" && sessionStorage.getItem('wx_openid') == '') {
								this.isweixin = true
								//console.log(true)
						} else {
								//console.log(false)
						}
						 this.$nextTick(function(){
							var swiper = new Swiper('.swiper-container', {
								pagination: '.swiper-pagination',
								paginationClickable: true,
								loop: true,
								speed: 600,
								slidesPerView: 'auto',
				                centeredSlides: true,
								autoplay: 500,
								observer:true,//修改swiper自己或子元素时，自动初始化swiper
								observeParents:true,//修改swiper的父元素时，自动初始化swiper
								onTouchEnd: function() {
									swiper.startAutoplay()
								}
                 });
             })
				},
				created() {
						this.loadHX()
						this.isactivated = true
				},
				//keep-alive 组件激活时调用 该钩子在服务器端渲染期间不被调用。
				activated: function () {
						//防止activated首次调用
						if (this.isactivated) {
								this.isactivated = false
								return false
						}
						this.loadHX()
						this.init();
				},
				//keep-alive 组件停用时调用。 该钩子在服务器端渲染期间不被调用。
				deactivated: function () {
						this.uninstallHX()
				}
		}
</script>
<style scoped>
   
        #caseListWrap   .loginBack{
			width:100%;
			height:100%;
			position:fixed;
			top:0;
			bottom:0;
			left:0;
			right:0;
			display:flex;
			z-index:99;
			background:rgba(0,0,0,0.5);
			justify-content:center;
			align-items:center;
		}
		#caseListWrap   .loginBack .loginContent{
			width:80%;
			height:300px;
			border-radius:8px;
			background:#fff;
			position:relative;
			display:flex;
			justify-content:center;
			align-items:center;
			flex-direction:column;
		
		}
		#caseListWrap   .loginBack .loginContent p{
             font-size:16px;
			 width:80%;
		}
		#caseListWrap   .loginBack .loginContent span{
			font-size:16px;
			color:blue;
			margin-top:100px;
		}
		#caseListWrap {
				width: 100%;
				height: auto;
				background: #ffffff;
		}
		#caseListWrap .swiper-container .swiper-wrapper .swiper-slide img{
          width:100%;
		}
		#caseListWrap .listsWrap {
				width: 100%;
				height: auto;
				padding-bottom: 50px;
		}
		
		#caseListWrap .listsWrap .list {
				width: 100%;
				height: auto;
				overflow: hidden;
		}
		
		#caseListWrap .listsWrap .list .lt {
				width: 54px;
				height: 104px;
				float: left;
				position: relative;
		}
		
		#caseListWrap .listsWrap .list .lt .ltTag {
				width: 30px;
				position: absolute;
				left: 0;
				top: 0;
		}
		
		#caseListWrap .listsWrap .list .lt span {
				width: 31px;
				height: 31px;
				display: block;
				border-radius: 100px;
				float: left;
				margin: 12px;
				position: relative;
		}
		
		#caseListWrap .listsWrap .list .lt span .tx {
				width: 100%;
				height: 100%;
				float: left;
				border-radius: 100px;
		}
		
		#caseListWrap .listsWrap .list .lt span .v {
				width: 12px;
				position: absolute;
				bottom: 0;
				right: 0;
		}
		
		#caseListWrap .listsWrap .list .rt {
				width: calc(100% - 66px);
				height: auto;
				float: left;
				border-bottom: 1px solid #eeeded;
				padding: 14px 0 12px;
		}
		
		#caseListWrap .listsWrap .list:last-child .rt {
				border-bottom: 0;
		}
		
		#caseListWrap .listsWrap .list .rt .div1 {
				width: 100%;
				height: 26px;
				float: left;
		}
		
		#caseListWrap .listsWrap .list .rt .div1 span {
				float: left;
				height: 26px;
				line-height: 26px;
		}
		
		#caseListWrap .listsWrap .list .rt .div1 span.name {
				width: 60px;
				font-size: 1.4rem;
				color: #231f20;
				text-align: left;
		}
		
		#caseListWrap .listsWrap .list .rt .div1 span.time {
				font-size: 1.2rem;
				color: #777274;
				text-align: left;
				margin-left: 10px;
		}
		
		#caseListWrap .listsWrap .list .rt .div1 span.price {
				width: 60px;
				font-size: 2rem;
				color: #ff7777;
				text-align: left;
				float: right;
		}
		
		#caseListWrap .listsWrap .list .rt .div1 span.grab {
				width: 60px;
				font-size: 1.6rem;
				color: #ff7777;
				text-align: left;
				float: right;
		}
		
		#caseListWrap .listsWrap .list .rt p {
				width: 100%;
				font-size: 1.5rem;
				color: #231f20;
				line-height: 1.6rem;
				height: 6.3rem;
				overflow: hidden;
				text-align: left;
		}
		
		#caseListWrap .listsWrap .list .rt .green {
				float: left;
				height: 1.8rem;
				line-height: 1.8rem;
				padding: 0 5px;
				font-size: 1.1rem;
				color: #61ac0e;
				background: rgba(54, 76, 139, 0.05);
				margin-top: 20px;
				margin-right: 5%;
		}
		
		#caseListWrap .listsWrap .list .rt .tag {
				float: left;
				height: 1.8rem;
				line-height: 1.8rem;
				padding: 0 5px;
				font-size: 1.1rem;
				color: #364c8b;
				background: rgba(54, 76, 139, 0.05);
				margin-top: 20px;
		}
		
		#caseListWrap .listsWrap .list .rt .come {
				float: right;
				height: 1.8rem;
				line-height: 1.8rem;
				padding: 0 5px;
				font-size: 1.1rem;
				color: #777274;
				margin-top: 20px;
		}
		
		/* 打开微信绑定页 */
		#caseListWrap .openWeChat {
				width: 44px;
				position: fixed;
				right: 20px;
				bottom: 124px;
				z-index: 1;
		}
		
		/* 打开筛选弹窗 */
		#caseListWrap .openPop {
				width: 46px;
				position: fixed;
				right: 20px;
				bottom: 70px;
				z-index: 1;
		}
		
		/* 筛选弹窗 */
		#caseListWrap .sltPop {
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				background: rgba(0, 0, 0, 0.5);
				z-index: 2;
		}
		
		#caseListWrap .sltPop .popCont {
				width: 100%;
				height: auto;
				max-height: 50%;
				background: #ffffff;
				overflow-y: scroll;
				position: absolute;
				left: 0;
				bottom: 0;
				padding-bottom: 30px;
		}
		
		#caseListWrap .sltPop .popCont h3 {
				width: 100%;
				height: 50px;
				line-height: 50px;
				font-size: 1.6rem;
				color: #4b535a;
				font-weight: normal;
				box-shadow: 0 1px 2px 0 rgba(198, 198, 198, 0.50);
		}
		
		#caseListWrap .sltPop .popCont div {
				width: 100%;
				max-height: 400px;
				overflow-y: scroll;
		}
		
		#caseListWrap .sltPop .popCont ul {
				width: 100%;
				height: auto;
		}
		
		#caseListWrap .sltPop .popCont ul li {
				width: 100%;
				height: 40px;
		}
		
		#caseListWrap .sltPop .popCont ul li span {
				width: 84%;
				height: 39px;
				line-height: 39px;
				border-bottom: 1px solid rgba(207, 207, 207, 0.17);
				float: left;
				margin-left: 8%;
				font-size: 1.5rem;
				color: #5a656e;
				background: url(./select-h.png) no-repeat 97% center;
				background-size: 16px auto;
				text-align: left;
		}
		
		#caseListWrap .sltPop .popCont ul li.ckd {
				background: rgba(21, 105, 184, 0.04);
		}
		
		#caseListWrap .sltPop .popCont ul li.ckd span {
				color: #1569b8;
				font-weight: bold;
				background: url(./select.png) no-repeat 97% center;
				background-size: 16px auto;
		}
		
		/* 底部菜单 */
		#caseListWrap .btmTab {
				width: 100%;
				height: 42px;
				position: fixed;
				left: 0;
				bottom: 0;
				background: #f9f9f9;
				box-shadow: 0 -1px 6px 0 rgba(209, 209, 209, 0.50);
				z-index: 1;
		}
		
		#caseListWrap .btmTab button {
				width: 50%;
				float: left;
				height: 17px;
				background: none;
				font-size: 1.4rem;
				color: #666666;
				line-height: 17px;
				margin-top: 12px;
				box-sizing: border-box;
		}
		
		/* 空页面 */
		#caseListWrap .empty {
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				background: #ffffff;
		}
		
		#caseListWrap .empty div {
				width: 100%;
				height: 120px;
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -60px;
				text-align: center;
		}
		
		#caseListWrap .empty div img {
				height: 86px;
		}
		
		#caseListWrap .empty div span {
				width: 100%;
				text-align: center;
				display: block;
				font-size: 1.4rem;
				color: #7d8389;
				padding-top: 10px;
		}
</style>