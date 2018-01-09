<template>
		<div id="loginWrap">
				<div class="logowrap">
						<img src="./logo.png">
				</div>
				<div class="loginCont box1" v-show="isloginByTel">
						<ul>
								<li>
										<img src="./phone.png">
										<input placeholder="请输入手机号" maxlength="11" @focus="focusFunc1" @blur="BlurFunc1" @input="inputTelFunc" v-model="telNum">
								</li>
								<li>
										<img src="./lock.png">
										<input type="" name="" placeholder="验证码" v-model="yzmNum" @focus="focusFunc1" @blur="BlurFunc1" maxlength="6">
										<button class="sendYzmBtn" :class="canSendYzm?'able':''" @click="sendYzmFunc">{{sendyzmCont}}
										</button>
								</li>
						</ul>
						<button class="loginBtn noFollow" :class="isAbleLoginByTel?'able':''" @click="loginByTelFunc">登录</button>
						<button class="changeAnother" @click="changeLoginType">账号登录</button>
				</div>
				<div class="loginCont box2" v-show="!isloginByTel">
						<ul>
								<li>
										<img src="./man.png">
										<input type="" name="" placeholder="请输入账号" @focus="focusFunc2" @blur="BlurFunc2" v-model="userid">
								</li>
								<li>
										<img src="./lock.png">
										<input :type="pwdType" name="" placeholder="密码" @focus="focusFunc2" @blur="BlurFunc2" v-model="pwdNum" style="	padding-right: 70px;">
										<button class="del" @click="delPwd"></button>
										<button class="visible" v-if="pwdType=='text'" @click="changePwdType1"></button>
										<button class="unvisible" v-if="pwdType=='password'" @click="changePwdType2"></button>
								</li>
						</ul>
						<span class="check"  @click='follow'>
								<label id="labelId"  v-if="!this.isFollow">
							     </label>
								<label v-if="this.isFollow" id="labelself">
								</label>
																				&nbsp;记住密码
										</span>
						<button class="loginBtn" :class="isAbleLoginById?'able':''" @click="loginByIdFunc">登录</button>
						<button class="changeAnother" @click="changeLoginType">手机登录</button>
				</div>
				<loading :loadCont="loadingCont" v-if="isShowLoading"></loading>
				<error-pop :getdata="errorPopCont" v-if="isError"></error-pop>
		</div>
</template>
<script>
		import dataUrl from '../../../static/js/urls.json'
		import bus from '../../bus'
		import loading from '@/components/loading/loading'
		import errorPop from '@/components/errorPop/errorPop'
		
		export default {
				components: {
						loading, errorPop
				},
				data() {
						return {
								isShowLoading: false,//是否显示loading
								loadingCont: '',//loading的内容
								/*手机号登录数据*/
								isloginByTel: true,//是否使用手机号登录
								telNum: '',//输入的电话号码
								yzmNum: '',//输入的验证码
								isAbleLoginByTel: false,//使用手机登录是否可点
								sendyzmCont: '发送验证码',//验证码按钮的文字
								canSendYzm: false,//是否可以发送手机验证码
								/*帐号密码登录数据*/
								userid: '',//用户账户
								pwdNum: '',//输入的密码
								pwdType: 'password',//是明文输入还是密文输入
								isAbleLoginById: false,//使用账户密码登录是否可点
								/*错误码处理*/
								isError: false,
								errorPopCont: '',
								isFollow:true//是否记住密码
						}
				},
				methods: {
					  follow() {
								
								this.isFollow = !this.isFollow;
						},
						/*删除首尾空格*/
						Trim(str) {
								str = str.replace(/(^\s*)|(\s*$)/g, "");
								return str
						},
						//删除所有的空格
						Trim2(str) {
								return str.replace(/\s+/g, "");
						},
						//更换登录方式
						changeLoginType() {
								this.isloginByTel = !this.isloginByTel
						},
						//手机号码登录
						//手机号码输入框获取焦点，验证码获取焦点
						focusFunc1() {
								this.isAbleLoginByTel = true
						},
						//手机号码输入框失去焦点以及验证码失去焦点
						BlurFunc1() {
								if (this.telNum == '' && this.yzmNum == '') {
										this.isAbleLoginByTel = false
								} else {
										this.isAbleLoginByTel = true
								}
						},
						//输入手机号
						inputTelFunc() {
								this.telNum = this.telNum.replace(/\D/g, '')
								var partten = /^1[3578][0-9]{9}$/
								if (this.telNum !== "" && partten.test(this.telNum) && this.telNum.length == 11) {
										this.canSendYzm = true
								} else {
										this.canSendYzm = false
								}
						},
						//发送手机验证码
						sendYzmFunc() {
								if (this.sendyzmCont === '发送验证码') {
										var that = this
										var url = dataUrl.url + '/ajaxsms'
										var params = new FormData()
										params.append('phone', that.telNum)
										this.$axios.post(url, params).then(function (res) {
												var code = res.data.code
												if (code !== 200) {
														that.isError = true
														that.errorPopCont = res.data.msg
														setTimeout(function () {
																that.isError = false
																that.errorPopCont = ''
														}, 1500)
												} else {
														var timer = null
														var seconds = 60
														timer = setInterval(function () {
																seconds = seconds - 1
																that.sendyzmCont = seconds + 'S'
																if (seconds == 0) {
																		clearInterval(timer)
																		that.sendyzmCont = '发送验证码'
																}
														}, 1000)
												}
										})
								}
						},
						//手机号码登录
						loginByTelFunc() {
								if (this.isAbleLoginByTel == true) {
										if (this.telNum === '') {
												var that = this
												that.isError = true
												that.errorPopCont = "请填写手机号码"
												setTimeout(function () {
														that.isError = false
														that.errorPopCont = ''
												}, 1500)
										} else if (this.yzmNum === '') {
												var that = this
												that.isError = true
												that.errorPopCont = "请填写验证码"
												setTimeout(function () {
														that.isError = false
														that.errorPopCont = ''
												}, 1500)
										} else {
												this.isShowLoading = true
												this.loadingCont = '正在登录'
												var that = this
												var url = dataUrl.url + '/loginsms'
												var params = new FormData()
												params.append('phone', that.telNum)
												params.append('code', that.yzmNum)
												this.$axios.post(url, params).then(function (res) {
														that.isShowLoading = false
														that.loadingCont = ''
														var code = res.data.code
														if (code == 200) {
																var getdata = res.data.data
																sessionStorage.setItem("username", getdata.username)
																sessionStorage.setItem("infoid", getdata.infoid)
																sessionStorage.setItem("userid", getdata.userid)
																that.setCookie('token', getdata.sessionid)
																that.$router.push({path: '/caseLists'})
														} else {
																that.isError = true
																that.errorPopCont = res.data.msg
																setTimeout(function () {
																		that.isError = false
																		that.errorPopCont = ''
																}, 1500)
														}
												})
										}
								}
						},
						// 账户密码登录
						focusFunc2() {
								this.isAbleLoginById = true
						},
						BlurFunc2() {
								if (this.userid == '' && this.pwdNum == '') {
										this.isAbleLoginById = false
								} else {
										this.isAbleLoginById = true
								}
						},
						// 修改明文密文
						changePwdType1() {
								this.pwdType = 'password'
						},
						changePwdType2() {
								this.pwdType = 'text'
						},
						//快速删除输入密码
						delPwd() {
								this.pwdNum = ''
						},
						//使用账户密码登录
						loginByIdFunc() {
								if (this.isAbleLoginById == true) {
										if (this.userid === '') {
												var that = this
												that.isError = true
												that.errorPopCont = "请填写帐号"
												setTimeout(function () {
														that.isError = false
														that.errorPopCont = ''
												}, 1500)
										} else if (this.pwdNum === '') {
												var that = this
												that.isError = true
												that.errorPopCont = "请填写密码"
												setTimeout(function () {
														that.isError = false
														that.errorPopCont = ''
												}, 1500)
										} else {
												var that = this
												var url = dataUrl.url + '/login'
												var params = new FormData()
												params.append('verify', '')
												params.append('username', that.userid)
												params.append('password', that.pwdNum)
												params.append('login_type', 'mini')
												this.$axios.post(url, params).then(function (res) {
														var code = res.data.code
														if (code == 200) {
																that.isShowLoading = false
																var getdata = res.data.data
																sessionStorage.setItem("username", getdata.username)
																sessionStorage.setItem("infoid", getdata.infoid)
																sessionStorage.setItem("userid", getdata.userid)
																sessionStorage.setItem("wx_openid", getdata.wx_openid)
																that.setCookie('token', getdata.sessionid)
																that.$router.push({path: '/caseLists'})
														} else {
																that.isError = true
																that.errorPopCont = res.data.msg
																setTimeout(function () {
																		that.isError = false
																		that.errorPopCont = ''
																}, 1500)
														}
												})
										}
								}
						},
						//数据初始化
						init() {
								document.getElementsByTagName('html')[0].style.height = '100%'
								document.getElementsByTagName('body')[0].style.height = '100%'
						},
						setHeight() {
						
						}
				},
				mounted() {
						this.init()
				},
				computed: {},
				destroyed() {
						document.getElementsByTagName('html')[0].style.height = 'auto'
						document.getElementsByTagName('body')[0].style.height = 'auto'
				},
		}
</script>
<style scoped>
		#loginWrap {
				width: 100%;
				height: 100%;
				background: #ffffff;
		}
		
		#loginWrap .logowrap {
				width: 100%;
				height: auto;
				padding: 32px 0 12px;
				overflow: hidden;
		}
		
		#loginWrap .logowrap img {
				width: 30%;
				float: left;
				margin-left: 35%;
		}
		
		#loginWrap .loginCont {
				width: 88%;
				height: auto;
				overflow: hidden;
				margin-left: 6%;
		}
		
		#loginWrap .loginCont ul {
				width: 100%;
				height: auto;
				overflow: hidden;
		}
		
		#loginWrap .loginCont ul li {
				width: 100%;
				height: 66px;
				position: relative;
		}
		
		#loginWrap .loginCont ul li img {
				height: 20px;
				float: left;
				margin-top: 22px;
				
		}
		
		#loginWrap .loginCont ul li input {
				width: calc(100% - 36px);
				height: 35px;
				line-height: 35px;
				float: right;
				border-bottom: 1px solid #f0f0f0;
				font-size: 1.6rem;
				color: #454749;
				margin-top: 16px;
				background: #ffffff;
				border-radius: 0;
				box-sizing: border-box;
		}
		
		#loginWrap .loginCont ul li .sendYzmBtn {
				width: 88px;
				height: 33px;
				position: absolute;
				right: 0;
				bottom: 20px;
				font-size: 13px;
				color: #aeaeae;
				background: rgba(227, 227, 227, 0.3);
				border-radius: 100px;
		}
		
		#loginWrap .loginCont ul li .del {
				width: 18px;
				height: 50px;
				position: absolute;
				right: 0;
				bottom: 6px;
				background: url(./delect.png) no-repeat center center;
				background-size: 100% auto;
		}
		
		#loginWrap .loginCont ul li .visible {
				width: 20px;
				height: 50px;
				position: absolute;
				right: 36px;
				bottom: 0;
				background: url(./look.png) no-repeat center center;
				background-size: 100% auto;
		}
		
		#loginWrap .loginCont ul li .unvisible {
				width: 20px;
				height: 50px;
				position: absolute;
				right: 36px;
				bottom: 5px;
				background: url(./look-no.png) no-repeat center center;
				background-size: 100% auto;
		}
		
		#loginWrap .loginCont ul li .sendYzmBtn.able {
				color: #1978d0;
				background: rgba(25, 120, 208, 0.1);
				
		}
		
		#loginWrap .loginBtn {
				width: 100%;
				height: 48px;
				background: #e3e3e3;
				border-radius: 4px;
				font-size: 16px;
				color: #ffffff;
				margin-top: 16px;
		}
		#loginWrap .noFollow{
			margin-top:40px;
		}
		#loginWrap .loginBtn.able {
				background: #1978d0;
		}
		
		#loginWrap .changeAnother {
				font-size: 14px;
				color: #035db3;
				background: none;
				padding-top: 18px;
				float: right;
		}
	.check {
				min-height: 24px;
				line-height: 24px;
				display: block;
				font-size: 14px;
				color: #666666;
				cursor:pointer;
				text-align:left;
		}
		
		
		#labelself{
                width: 14px;
				height: 14px;
				display: inline-block;
				border-radius: 4px;
				border:1px solid #ccc;
				cursor:pointer;
				position:relative;
				top:3px;
		}
		
		#labelId {
				width: 16px;
				height: 16px;
				display: inline-block;
				border-radius: 4px;
				background-color: #025db3;
				cursor:pointer;
				position:relative;
				top:3px;
		}
		#labelId:after {
				content: '';
				display: inline-block;
				border: 1px solid #ffffff;
				border-top-width: 0;
				border-right-width: 0;
				width: 10px;
				height: 7px;
				-webkit-transform: rotate(-50deg);
				position: absolute;
				top: 2px;
				left: 3px;
				cursor:pointer;
		}
</style>