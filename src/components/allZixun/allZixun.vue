<template>
		<div id="allListWrap">
				<ul class="listsWrap" v-if="this.flag">
						<li class="list" v-for="(item,index) in caselists" @click="join(index)">
								<div class="lt">
										<img src="./start.png" class="ltTag" v-if="item.hh_type==1">
										<img src="./over.png" class="ltTag" v-if="item.hh_type==2">
										<img src="./reject.png" class="ltTag" v-if="item.hh_type==3">
										<span>
														<img :src="item.touxiang" class="tx">
														<img src="./vv.png" class="v" v-if="item.law_renz==1">
														<i src="" class="new" v-if="item.newnum!=0"></i>
												</span>
								</div>
								<div class="rt">
										<div class="div1">
												<span class="name hidden">{{item.name}}</span>
												<span class="time">{{item.time}}</span>
												<span class="price" v-if="item.pay_type==1">￥{{item.pay_money}}</span>
										</div>
										<p>{{item.content}}</p>
										<span class="green" v-if="item.type==1">电话咨询</span>
										<span class="tag" v-if="item.leixing!=''">{{item.leixing}}</span>
										<span class="come">{{item.laiyuan}}</span>
								</div>
						</li>
				</ul>
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
				<div class="empty" v-if="!this.flag">
						<div>
								<img src="./except1.png">
								<span>— 暂无用户向您咨询 —</span>
						</div>
				</div>
				<div class="btmTab">
						<button @click="tabItem">案源广场</button>
						<button style="border-left: 1px solid rgba(151,151,151,0.41);color: #1569b8;font-weight:bold;">全部咨询</button>
				</div>
		</div>
</template>
<script>
		import dataUrl from '../../../static/js/urls.json'
		import bus from '../../bus'
		
		export default {
				data() {
						return {
								infoid: '',
								wlaiyan: '',
								caselists: [],
								isShowSltBtn: true,//是否显示打开弹窗的按钮
								isShowSltCome: false,//是否显示少选弹窗
								choices: [],//筛选选项
								sltNum: 0,//筛选选中的条件的index
								sltCome: '',//咨询来源
								flag: true,
								infiniteLoading: true,
								isactivated: false,//activated使用状态 true使用中 false未使用
								
						}
				},
				methods: {
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
						init() {
								this.getComes();
								let url = dataUrl.url + '/myanyuan'
								let params = new FormData()
								this.infoid = sessionStorage.getItem('infoid')
								params.append('infoid', this.infoid)
								params.append('wlaiyan', this.wlaiyan)
								let vm = this;
								this.$axios.post(url, params).then(function (res) {
										let len = res.data.data.length;
										if (len == 0) {
												vm.flag = false
										} else {
												vm.caselists = res.data.data;
										}
										
								})
								
						},
						tabItem() {
								this.sltNum = 0;
								this.$router.push("/caseLists")
								
						},
						join(index) {
								sessionStorage.setItem('caseid', this.caselists[index].id)
								sessionStorage.setItem('casesource', this.caselists[index].laiyuan)
								if (this.caselists[index].type == 1) {
										this.$router.push("/telZixun")
								} else {
										this.$router.push("/chating")
								}
						},
						//打开筛选来源
						openSltComes() {
								this.isShowSltCome = true
								this.isShowSltBtn = false
						},
						//筛选列表
						chooseComes() {
								let url = dataUrl.url + '/myanyuan'
								let params = new FormData()
								this.infoid = sessionStorage.getItem('infoid')
								params.append('infoid', this.infoid)
								params.append('wlaiyan', this.sltCome)
								
								var that = this
								this.$axios.post(url, params).then(function (res) {
										var data = res.data.data
										that.caselists = data
										if (that.caselists == "") {
												that.flag = false
										} else {
												that.flag = true;
										}
										
								})
						},
						//选择来源
						sltComeFunc(index) {
								this.sltNum = index
								this.isShowSltCome = false
								this.isShowSltBtn = true
								if (index == 0) {
										this.sltCome = ''
										
								} else {
										this.sltCome = this.choices[index]
										
								}
								this.chooseComes();
						},
						hidePop() {
								this.isShowSltCome = false
								this.isShowSltBtn = true
						},
						//获取列表
						getList() {
								let url = dataUrl.url + '/myanyuan'
								let params = new FormData()
								this.infoid = sessionStorage.getItem('infoid')
								params.append('infoid', this.infoid)
								params.append('wlaiyan', this.wlaiyan)
								let vm = this;
								vm.$axios.post(url, params).then((response) => {
										let data = response.data.data
										vm.caselists = data
								}, (response) => {
										console.log('allZixun-error');
								});
						},
						
						//环信--登录
						loginHX() {
								var username = sessionStorage.getItem('username')
								this.$im.open({
										apiUrl: WebIM.config.apiURL,
										user: username,
										pwd: '123456',
										appKey: WebIM.config.appkey,
										success: function (data) {
												bus.$emit('LoginSuccess', true)
										}
								})
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
						this.loginHX()
				},
				created() {
						this.loadHX()
						this.init();
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
						this.sltNum=0;
				},
				//keep-alive 组件停用时调用。 该钩子在服务器端渲染期间不被调用。
				deactivated: function () {
						this.uninstallHX()
				}
				
		}
</script>
<style scoped>
		#allListWrap {
				width: 100%;
				height: auto;
				background: #ffffff;
		}
		
		#allListWrap .listsWrap {
				width: 100%;
				height: auto;
				padding-bottom: 50px;
		}
		
		#allListWrap .listsWrap .list {
				width: 100%;
				height: auto;
				overflow: hidden;
		}
		
		#allListWrap .listsWrap .list .lt {
				width: 54px;
				height: 104px;
				float: left;
				position: relative;
		}
		
		#allListWrap .listsWrap .list .lt .ltTag {
				width: 30px;
				position: absolute;
				left: 0;
				top: 0;
		}
		
		#allListWrap .listsWrap .list .lt span {
				width: 31px;
				height: 31px;
				display: block;
				border-radius: 100px;
				float: left;
				margin: 12px;
				position: relative;
		}
		
		#allListWrap .listsWrap .list .lt span .tx {
				width: 100%;
				height: 100%;
				float: left;
				border-radius: 100px;
		}
		
		#allListWrap .listsWrap .list .lt span .new {
				width: 7px;
				height: 7px;
				display: block;
				background: #f43530;
				box-shadow: 0 1px 1px 0 rgba(244, 53, 48, 0.30);
				border-radius: 100px;
				position: absolute;
				top: 0;
				right: 0;
		}
		
		#allListWrap .listsWrap .list .lt span .v {
				width: 12px;
				position: absolute;
				bottom: 0;
				right: 0;
		}
		
		#allListWrap .listsWrap .list .rt {
				width: calc(100% - 66px);
				height: auto;
				float: left;
				border-bottom: 1px solid #eeeded;
				padding: 14px 0 12px;
		}
		
		#allListWrap .listsWrap .list .rt .div1 {
				width: 100%;
				height: 26px;
				float: left;
		}
		
		#allListWrap .listsWrap .list .rt .div1 span {
				float: left;
		}
		
		#allListWrap .listsWrap .list .rt .div1 span.name {
				width: 60px;
				font-size: 1.4rem;
				color: #231f20;
				line-height: 16px;
				text-align: left;
		}
		
		#allListWrap .listsWrap .list .rt .div1 span.time {
				font-size: 1.2rem;
				color: #777274;
				line-height: 18px;
				text-align: left;
		}
		
		#allListWrap .listsWrap .list .rt .div1 span.price {
				width: 60px;
				font-size: 2rem;
				color: #ff7777;
				text-align: left;
				float: right;
		}
		
		#allListWrap .listsWrap .list .rt p {
				width: 100%;
				font-size: 1.5rem;
				color: #231f20;
				line-height: 1.6rem;
				height: 6.3rem;
				overflow: hidden;
				text-align: left;
		}
		
		#allListWrap .listsWrap .list .rt .green {
				float: left;
				height: 1.8rem;
				line-height: 1.8rem;
				padding: 0 5px;
				font-size: 1.1rem;
				background: rgba(54, 76, 139, 0.05);
				margin-top: 20px;
				color: #61ac0e;
		}
		
		#allListWrap .listsWrap .list .rt .tag {
				float: left;
				height: 1.8rem;
				line-height: 1.8rem;
				padding: 0 5px;
				font-size: 1.1rem;
				color: #364c8b;
				background: rgba(54, 76, 139, 0.05);
				margin-top: 20px;
				margin-left: 4px;
		}
		
		#allListWrap .listsWrap .list .rt .come {
				float: right;
				height: 1.8rem;
				line-height: 1.8rem;
				padding: 0 5px;
				font-size: 1.1rem;
				color: #777274;
				margin-top: 20px;
		}
		
		/* 打开微信绑定页 */
		#allListWrap .openWeChat {
				width: 44px;
				position: fixed;
				right: 20px;
				bottom: 124px;
				z-index: 1;
		}
		
		/* 打开筛选弹窗 */
		#allListWrap .openPop {
				width: 46px;
				position: fixed;
				right: 20px;
				bottom: 70px;
				z-index: 1;
		}
		
		/* 筛选弹窗 */
		#allListWrap .sltPop {
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				background: rgba(0, 0, 0, 0.5);
				z-index: 2;
		}
		
		#allListWrap .sltPop .popCont {
				width: 100%;
				height: 300px;
				max-height: 50%;
				background: #ffffff;
				overflow-y: scroll;
				position: absolute;
				left: 0;
				bottom: 0;
				padding-bottom: 30px;
		}
		
		#allListWrap .sltPop .popCont h3 {
				width: 100%;
				height: 50px;
				line-height: 50px;
				font-size: 1.6rem;
				color: #4b535a;
				position: absolute;
				left: 0;
				top: 0;
				font-weight: normal;
				box-shadow: 0 1px 2px 0 rgba(198, 198, 198, 0.50);
		}
		
		#allListWrap .sltPop .popCont div {
				width: 100%;
				height: 400px;
				max-height: 500px;
				position: absolute;
				left: 0;
				top: 50px;
				overflow-y: scroll;
		}
		
		#allListWrap .sltPop .popCont ul {
				width: 100%;
				height: auto;
		}
		
		#allListWrap .sltPop .popCont ul li {
				width: 100%;
				height: 40px;
		}
		
		#allListWrap .sltPop .popCont ul li span {
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
		
		#allListWrap .sltPop .popCont ul li.ckd {
				background: rgba(21, 105, 184, 0.04);
		}
		
		#allListWrap .sltPop .popCont ul li.ckd span {
				color: #1569b8;
				font-weight: bold;
				background: url(./select.png) no-repeat 97% center;
				background-size: 16px auto;
		}
		
		/* 底部菜单 */
		#allListWrap .btmTab {
				width: 100%;
				height: 42px;
				position: fixed;
				left: 0;
				bottom: 0;
				background: #f9f9f9;
				box-shadow: 0 -1px 6px 0 rgba(209, 209, 209, 0.50);
				z-index: 1;
		}
		
		#allListWrap .btmTab button {
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
		#allListWrap .empty {
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				background: #ffffff;
		}
		
		#allListWrap .empty div {
				width: 100%;
				height: 120px;
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -60px;
				text-align: center;
		}
		
		#allListWrap .empty div img {
				height: 86px;
		}
		
		#allListWrap .empty div span {
				width: 100%;
				text-align: center;
				display: block;
				font-size: 1.4rem;
				color: #7d8389;
				padding-top: 10px;
		}
</style>