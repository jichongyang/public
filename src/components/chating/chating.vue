<template>
		<div id="chatingWrap">
				<div :class="{chatCon:!this.flag}" ref="chatCon" class="pos">
						<div class="cont" ref="cont">
									<span class="lt">
										<img :src="this.caselists.touxiang" />
									</span>
								<div class="rt">
										<div class="box1">
												<span class="name">{{this.caselists.name}}</span>
												<span class="tel">{{this.caselists.tel}}</span>
												<span class="time">{{this.caselists.time}}</span>
										</div>
										<p :class="{short:this.flag}" ref="short">
												{{this.caselists.content}}
										</p>
										<span class="come">来源：{{this.caselists.laiyuan}}</span>
										<span class="type" v-if="this.caselists.leixing!=''">{{this.caselists.leixing}}</span>
										<span class="free" v-if="this.caselists.pay_type==0">免费</span>
										<span class="addr" v-if="this.caselists.hh_xuqiudz!=''">{{this.caselists.hh_xuqiudz}}</span>
										<span class="price" v-if="this.caselists.pay_type==1">￥{{this.caselists.pay_money}}</span>
										<button class="down" @click="pulldown" v-if="this.flag && this.caselists.content">展开</button>
										<button class="up" @click="pullup" v-if="!this.flag && this.caselists.content">收起</button>
								</div>
						</div>
				</div>
				
				<div class="chatingCont" id="chatingCont" ref="chatingCont">
						<div class="chating" ref="chating" id="chating">
								<div class="my-gallery" data-pswp-uid="1">
										<ul ref="chatList" id="chatList">
												<li v-for="(item,index) in casescon" :class="{'lawyer':item.type==1,'user':item.type==0}">
											<span class="tx">
												<img :src="item.touxiang">
											</span>
														
														<div class="rt">
																<p v-if="item.msg_type=='text'" v-html="item.content">{{item.content}}</p>
																
																<figure>
																		<a :href="item.content" data-size="1200x1200">
																				<img :src="item.content" class="jiao" v-if="item.msg_type=='image'" />
																		</a>
																</figure>
														</div>
												</li>
										</ul>
								</div>
						</div>
				</div>
				<div class="btmSend" ref="btmSend" id="btmSend">
						<input type="text" name="" id="inp" v-model="name" @focus="focus" @blur="blur">
						<button class="send" @click="sendMeg">发送</button>
				</div>
		</div>


</template>
<script>
		import dataUrl from '../../../static/js/urls.json'
		import bus from '../../bus'
		
		export default {
				data() {
						return {
								id: '',
								source: '',
								infoid: '',
								flag: true,
								caselists: {},
								casescon: [],
								content: '',
								name: '',
								click: false,
								interval: '',
								isSubmit: false,//提交状态 true提交中 false未提交,
								num: 0,
								imgSrc: '',
								isactivated: false,//activated使用状态 true使用中 false未使用
								bfscrolltop: ''
						}
				},
				methods: {
						
						showImg() {
								var initPhotoSwipeFromDOM = function (gallerySelector) {
										
										// 解析来自DOM元素幻灯片数据（URL，标题，大小...）
										// (children of gallerySelector)
										var parseThumbnailElements = function (el) {
												var thumbElements = el.childNodes,
																numNodes = thumbElements.length,
																items = [],
																figureEl,
																linkEl,
																size,
																item;
												
												for (var i = 0; i < numNodes; i++) {
														
														figureEl = thumbElements[i]; // <figure> element
														
														// 仅包括元素节点
														if (figureEl.nodeType !== 1) {
																continue;
														}
														linkEl = figureEl.children[0]; // <a> element
														
														size = linkEl.getAttribute('data-size').split('x');
														
														// 创建幻灯片对象
														item = {
																src: linkEl.getAttribute('href'),
																w: parseInt(size[0], 10),
																h: parseInt(size[1], 10)
														};
														
														
														if (figureEl.children.length > 1) {
																// <figcaption> content
																item.title = figureEl.children[1].innerHTML;
														}
														
														if (linkEl.children.length > 0) {
																// <img> 缩略图节点, 检索缩略图网址
																item.msrc = linkEl.children[0].getAttribute('src');
														}
														
														item.el = figureEl; // 保存链接元素 for getThumbBoundsFn
														items.push(item);
												}
												
												return items;
										};
										
										// 查找最近的父节点
										var closest = function closest(el, fn) {
												return el && ( fn(el) ? el : closest(el.parentNode, fn) );
										};
										
										// 当用户点击缩略图触发
										var onThumbnailsClick = function (e) {
												e = e || window.event;
												e.preventDefault ? e.preventDefault() : e.returnValue = false;
												
												var eTarget = e.target || e.srcElement;
												
												// find root element of slide
												var clickedListItem = closest(eTarget, function (el) {
														return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
												});
												
												if (!clickedListItem) {
														return;
												}
												
												// find index of clicked item by looping through all child nodes
												// alternatively, you may define index via data- attribute
												var clickedGallery = clickedListItem.parentNode,
																childNodes = clickedListItem.parentNode.childNodes,
																numChildNodes = childNodes.length,
																nodeIndex = 0,
																index;
												
												for (var i = 0; i < numChildNodes; i++) {
														if (childNodes[i].nodeType !== 1) {
																continue;
														}
														
														if (childNodes[i] === clickedListItem) {
																index = nodeIndex;
																break;
														}
														nodeIndex++;
												}
												
												
												if (index >= 0) {
														// open PhotoSwipe if valid index found
														openPhotoSwipe(index, clickedGallery);
												}
												return false;
										};
										
										// parse picture index and gallery index from URL (#&pid=1&gid=2)
										var photoswipeParseHash = function () {
												var hash = window.location.hash.substring(1),
																params = {};
												
												if (hash.length < 5) {
														return params;
												}
												
												var vars = hash.split('&');
												for (var i = 0; i < vars.length; i++) {
														if (!vars[i]) {
																continue;
														}
														var pair = vars[i].split('=');
														if (pair.length < 2) {
																continue;
														}
														params[pair[0]] = pair[1];
												}
												
												if (params.gid) {
														params.gid = parseInt(params.gid, 10);
												}
												
												return params;
										};
										
										var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
												var pswpElement = document.querySelectorAll('.pswp')[0],
																gallery,
																options,
																items;
												items = parseThumbnailElements(galleryElement);
												
												// 这里可以定义参数
												options = {
														barsSize: {
																top: 100,
																bottom: 100
														},
														fullscreenEl: false, // 是否支持全屏按钮
														shareButtons: [
																{id: 'wechat', label: '分享微信', url: '#'},
																{id: 'weibo', label: '新浪微博', url: '#'},
																{id: 'download', label: '保存图片', url: '{{raw_image_url}}', download: true}
														], // 分享按钮
														
														// define gallery index (for URL)
														galleryUID: galleryElement.getAttribute('data-pswp-uid'),
														
														getThumbBoundsFn: function (index) {
																// See Options -> getThumbBoundsFn section of documentation for more info
																var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
																				pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
																				rect = thumbnail.getBoundingClientRect();
																
																return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
														}
														
												};
												options.shareEl = false;
												options.fullscreenEl = false;
												
												// PhotoSwipe opened from URL
												if (fromURL) {
														if (options.galleryPIDs) {
																// parse real index when custom PIDs are used
																for (var j = 0; j < items.length; j++) {
																		if (items[j].pid == index) {
																				options.index = j;
																				break;
																		}
																}
														} else {
																// in URL indexes start from 1
																options.index = parseInt(index, 10) - 1;
														}
												} else {
														options.index = parseInt(index, 10);
												}
												
												// exit if index not found
												if (isNaN(options.index)) {
														return;
												}
												
												if (disableAnimation) {
														options.showAnimationDuration = 0;
												}
												
												// Pass data to PhotoSwipe and initialize it
												gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
												gallery.init();
										};
										
										// loop through all gallery elements and bind events
										var galleryElements = document.querySelectorAll(gallerySelector);
										
										for (var i = 0, l = galleryElements.length; i < l; i++) {
												galleryElements[i].setAttribute('data-pswp-uid', i + 1);
												galleryElements[i].onclick = onThumbnailsClick;
										}
										
										// Parse URL and open gallery if it contains #&pid=3&gid=1
										var hashData = photoswipeParseHash();
										if (hashData.pid && hashData.gid) {
												openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
										}
								};
								
								// execute above function
								initPhotoSwipeFromDOM('.my-gallery');
								
								
						},
						setHeight() {
						},
						scrollToBottom: function () {
								this.$nextTick(() => {
										var div = document.getElementById('chating')
										div.scrollTop = div.scrollHeight
										
								})
						},
						focus() {
								let vm = this;
								let str = navigator.userAgent.toLowerCase();
								let ver = str.match(/cpu iphone os (.*?) like mac os/);
								
								if (ver[1] == '11_1_2'||ver[1] == '11_2_1') {
									
									window.addEventListener('scroll', function () {
										
								}, false)

								
								} else {
										//设置一个计时器，时间设置与软键盘弹出所需时间相近
										vm.interval = setInterval(function () {
												document.body.scrollTop = document.body.scrollHeight;
												//获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
												
										}, 100)
								}
								
						},
						blur() {
								clearInterval(this.interval);//清除计时器
								document.body.scrollTop = this.bfscrolltop;//将软键盘唤起前的浏览器滚动部分高度重新赋给改变后的高度
						},
						
						init() {
								this.name = "";
								this.bfscrolltop = document.body.scrollTop;
								let url = dataUrl.url + '/myanyuanxq'
								let urlcon = dataUrl.url + '/myanyuanlt'
								let params = new FormData()
								this.infoid = sessionStorage.getItem('infoid')
								this.id = sessionStorage.getItem('caseid')
								this.source = sessionStorage.getItem('casesource')
								params.append('infoid', this.infoid)
								params.append('id', this.id)
								params.append('source', this.source)
								let vm = this;
								this.$axios.post(url, params).then(function (res) {
										if (res.data.code != 200) {
												vm.$router.push('/caseLists')
										}
										vm.caselists = res.data.data;
										var xqdata = vm.caselists;
										//用户存在并且环信未注册
										if (xqdata.hx_reg != 1 && xqdata.hx_touser) {
												vm.regHX(
																xqdata.hx_touser,
																xqdata.laiyuan
												)
										}
										//群组不存在--注册环信群组
										if (xqdata.hx_groupid == 'reg') {
												vm.regGroup(
																xqdata.name + "-" + xqdata.laiyuan,
																xqdata.name + '-' + xqdata.laiyuan,
																[xqdata.hx_touser],
																xqdata.id,
																xqdata.laiyuan
												)
										}
								})
								this.$axios.post(urlcon, params).then(function (res) {
										vm.casescon = res.data.data;
								})
						},
						
						pulldown() {
								this.flag = false;
								let el = this.$refs.chatCon;
								let w = document.documentElement.clientWidth;
								let h = document.documentElement.clientHeight;
								el.style.overflowY = 'scroll';
								el.style.width = w + 'px';
								el.style.height = h + 'px';
								//移动端旋转
								window.addEventListener("orientationchange", function () {
										console.log(window.orientation)
										let w = document.documentElement.clientWidth;
										let h = document.documentElement.clientHeight;
										el.style.overflowY = 'scroll';
										el.style.width = w + 'px';
										el.style.height = h + 'px';
										//console.log( el.style.width)
								})
						},
						pullup() {
								this.flag = true
								this.bfscrolltop = document.body.scrollTop;
								let el = this.$refs.chatCon;
								let elc = this.$refs.cont;
								let w = document.documentElement.clientWidth;
								let h = 0;
								el.style.overflowY = 'visible ';
								el.style.width = w + 'px';
								el.style.height = h + 'px';
								elc.style.width = w + 'px';
								console.log(elc.style.width + 'pullup')
								window.addEventListener("orientationchange", function () {
										let w = document.documentElement.clientWidth;
										let h = 0;
										el.style.overflowY = 'visible ';
										el.style.width = w + 'px';
										el.style.height = h + 'px';
										elc.style.width = w + 'px';
										console.log(w)
								})
								
						},
						//发送新消息
						sendMeg() {
								if (this.name == '') {
										this.click = false
								} else {
										this.click = true
										let url = dataUrl.url + '/myanyuantext'
										let params = new FormData()
										this.infoid = sessionStorage.getItem('infoid')
										this.id = sessionStorage.getItem('caseid')
										this.source = sessionStorage.getItem('casesource')
										params.append('infoid', this.infoid)
										params.append('id', this.id)
										params.append('source', this.source)
										params.append('content', this.name)
										let vm = this;
										//防止重复提交
										if (vm.isSubmit) return false
										vm.isSubmit = true	//防止重复提交
										this.$axios.post(url, params).then(function (res) {
												var xqdata = vm.caselists;
												if (xqdata.hx_groupid) {
														//发送环信群组消息
														vm.sendGroupText(vm.name, xqdata.hx_groupid, xqdata.hx_ext);
												} else if (xqdata.hx_touser) {
														//发送环信私聊消息
														vm.sendPrivateText(vm.name, xqdata.hx_touser, xqdata.hx_ext);
												}
												vm.casescon.push(res.data.data);
												vm.getList();
												vm.name = "";
												vm.isSubmit = false	//防止重复提交
										})
								}
								
						},
						getList() {
								let urlcon = dataUrl.url + '/myanyuanlt'
								let params = new FormData()
								this.infoid = sessionStorage.getItem('infoid')
								this.id = sessionStorage.getItem('caseid')
								this.source = sessionStorage.getItem('casesource')
								params.append('infoid', this.infoid)
								params.append('id', this.id)
								params.append('source', this.source)
								let vm = this;
								this.$axios.post(urlcon, params).then(function (res) {
										vm.casescon = res.data.data;
								})
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
						},
						/**
						 * 环信--用户注册
						 * @param username 用户名
						 * @param source 来源
						 */
						regHX(username, source) {
								var that = this
								var options = {
										username: username,
										password: '123456',
										nickname: username,
										appKey: WebIM.config.appkey,
										success: function (msg) {
												var url = dataUrl.url + '/userRegHx'
												var params = new FormData()
												params.append('touser', username)
												params.append('source', source)
												that.$axios.post(url, params).then(function (res) {
												
												})
										},
										error: function (err) {
												//错误发送邮件
												var url = dataUrl.url + '/useHxErr'
												var params = new FormData()
												params.append('title', '[律金汇OS-手机端][新用户注册]错误')
												params.append('describe', 'vue律金汇OS新用户注册错误')
												params.append('hxreturn', JSON.stringify(err))
												that.$axios.post(url, params).then(function (res) {
												
												})
										},
										apiUrl: WebIM.config.apiURL
								};
								this.$im.registerUser(options);
						},
						/**
						 * 环信--创建群组
						 * @param groupname 群组名
						 * @param desc 群组描述
						 * @param members 用户名组成的数组
						 * @param id 会话唯一标识
						 * @param source 来源
						 */
						regGroup(groupname, desc, members, id, source) {
								var that = this
								var options = {
										data: {
												groupname: groupname,//群组名
												desc: desc,//群组描述
												members: members,//用户名组成的数组
												public: false,//等于true时，创建为公开群
												approval: true,//approval等于true时，加群需要审批，为false时加群无需审批
												allowinvites: false//是否允许群成员邀请别人加入此群
										},
										success: function (respData) {
												//更改当前的群组ID
												that.caselists.hx_groupid = respData.data.groupid
												//保存群组ID
												var url = dataUrl.url + '/createGroupNew'
												var params = new FormData()
												params.append('id', id)
												params.append('groupid', respData.data.groupid)
												params.append('source', source)
												that.$axios.post(url, params).then(function (res) {
												
												})
										},
										error: function (err) {
												//错误发送邮件
												var url = dataUrl.url + '/useHxErr'
												var params = new FormData()
												params.append('title', '[律金汇OS-手机端][创建群组]错误')
												params.append('describe', 'vue律金汇OS创建群组错误')
												params.append('hxreturn', JSON.stringify(err))
												that.$axios.post(url, params).then(function (res) {
												
												})
										}
								};
								this.$im.createGroupNew(options);
						},
						/**
						 * 环信--私聊发送文本消息
						 * @param text 文本消息
						 * @param to 用户标识
						 */
						sendPrivateText(text, to, ext = {}) {
								var id = this.$im.getUniqueId();// 生成本地消息id
								var msg = new WebIM.message('txt', id); // 创建文本消息
								msg.set({
										msg: text,                       // 消息内容
										to: to,                          // 接收消息对象
										ext: ext,   //用户自扩展的消息内容（群聊用法相同）
										roomType: false,
										success: function () {
										
										},
										fail: function (err) {
												//错误发送邮件
												var url = dataUrl.url + '/useHxErr'
												var params = new FormData()
												params.append('title', '[律金汇OS-手机端][私聊文本消息]错误')
												params.append('describe', 'vue律金汇OS发送私聊文本消息错误')
												params.append('hxreturn', JSON.stringify(err))
												that.$axios.post(url, params).then(function (res) {
												
												})
										}
								});
								msg.body.chatType = 'singleChat';
								this.$im.send(msg.body);
						},
						/**
						 * 环信--群组发送文本消息
						 * @param text 文本消息
						 * @param to 群组ID
						 */
						sendGroupText(text, to, ext = {}) {
								var id = this.$im.getUniqueId();            // 生成本地消息id
								var msg = new WebIM.message('txt', id); // 创建文本消息
								var option = {
										msg: text,             // 消息内容
										to: to,                     // 接收消息对象(群组id)
										ext: ext,   //用户自扩展的消息内容（群聊用法相同）
										roomType: false,
										chatType: 'chatRoom',
										success: function () {
										},
										fail: function (err) {
												//错误发送邮件
												var url = dataUrl.url + '/useHxErr'
												var params = new FormData()
												params.append('title', '[律金汇OS-手机端][群组文本消息]错误')
												params.append('describe', 'vue律金汇OS发送群组文本消息错误')
												params.append('hxreturn', JSON.stringify(err))
												that.$axios.post(url, params).then(function (res) {
												
												})
										}
								};
								msg.set(option);
								msg.setGroup('groupchat');
								this.$im.send(msg.body);
						},
						
				},
				mounted() {
						this.loginHX();
						this.showImg();
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
				},
				//keep-alive 组件停用时调用。 该钩子在服务器端渲染期间不被调用。
				deactivated: function () {
						this.uninstallHX()
						this.$destroy();
				},
				watch: {
						'casescon': 'scrollToBottom'
				}
		}
</script>

<style scoped>
		#chatingWrap {
				width: 100%;
				height: 100%;
		}
		
		#chatingWrap .chatCon {
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.5);
				z-index: 1000;
				position: absolute;
				left: 0;
				top: 0;
		}
		
		#chatingWrap .pos {
				width: 100%;
				max-height: 100%;
				z-index: 1000;
				position: absolute;
				top: 0;
				left: 0;
		}
		
		#chatingWrap .cont {
				width: 100%;
				height: auto;
				
				z-index: 999;
				background: #ffffff;
				box-shadow: 0 2px 6px 0 #efeeee;
				overflow: hidden;
				padding-top: 6px;
				
		}
		
		#chatingWrap .cont .lt {
				width: 31px;
				height: 31px;
				float: left;
				margin-left: 12px;
				border-radius: 100px;
				background: #f3f3f3;
				overflow: hidden;
		}
		
		#chatingWrap .cont .lt img {
				width: 100%;
				height: 100%;
				float: left;
		}
		
		#chatingWrap .cont .rt {
				width: calc(100% - 62px);
				height: auto;
				float: right;
				margin-right: 12px;
				overflow: hidden;
				padding-bottom: 6px;
		}
		
		#chatingWrap .cont .rt .box1 {
				width: 100%;
				height: 20px;
				float: left;
		}
		
		#chatingWrap .cont .rt .box1 span {
				float: left;
		}
		
		#chatingWrap .cont .rt .box1 span.name {
				font-size: 1.4rem;
				color: #231f20;
				margin-right: 14px;
				line-height: 20px;
		}
		
		#chatingWrap .cont .rt .box1 span.tel {
				font-size: 1.2rem;
				color: #231f20;
				line-height: 20px;
		}
		
		#chatingWrap .cont .rt .box1 span.time {
				font-size: 1.1rem;
				color: #777274;
				float: right;
				line-height: 20px;
		}
		
		#chatingWrap .cont .rt p {
				width: 100%;
				font-size: 1.5rem;
				color: #231f20;
				line-height: 23px;
				text-align: justify;
				margin: 2px 0 6px;
		}
		
		#chatingWrap .cont .rt p.short {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				-o-text-overflow: ellipsis;
		}
		
		#chatingWrap .cont .rt .come {
				width: 100%;
				font-size: 1.1rem;
				color: #646363;
				float: left;
				text-align: left;
		}
		
		#chatingWrap .cont .rt .type {
				height: 18px;
				line-height: 18px;
				font-size: 1.1rem;
				color: #364c8b;
				float: left;
				text-align: center;
				padding: 0 5px;
				background: #f2f2f2;
				margin-top: 6px;
				margin-right: 4px;
		}
		
		#chatingWrap .cont .rt .free {
				height: 18px;
				line-height: 18px;
				font-size: 1.1rem;
				color: #66cccc;
				float: left;
				text-align: center;
				padding: 0 5px;
				background: rgba(102, 204, 204, 0.2);
				margin-top: 6px;
				margin-right: 4px;
		}
		
		#chatingWrap .cont .rt .addr {
				height: 18px;
				line-height: 18px;
				font-size: 1.1rem;
				color: #646363;
				float: left;
				text-align: center;
				padding: 0 5px;
				padding-left: 15px;
				background: url(./address.png) no-repeat left center;
				background-size: auto 12px;
				margin-top: 6px;
				margin-right: 4px;
		}
		
		#chatingWrap .cont .rt .price {
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
		
		#chatingWrap .cont .rt .down {
				height: 18px;
				padding-right: 15px;
				line-height: 18px;
				font-size: 1.1rem;
				color: #1978d0;
				float: right;
				margin-top: 6px;
				background: url(./arrow-down.png) no-repeat right center;
				background-size: auto 10px;
		}
		
		#chatingWrap .cont .rt .up {
				height: 18px;
				padding-right: 15px;
				line-height: 18px;
				font-size: 1.1rem;
				color: #1978d0;
				float: right;
				margin-top: 6px;
				background: url(./arrow-up.png) no-repeat right center;
				background-size: auto 10px;
		}
		
		/* 底部发送 */
		#chatingWrap .btmSend {
				width: 100%;
				height: 46px;
				position: absolute;
				left: 0;
				bottom: 0;
				z-index: 999;
				background: #fafafa;
				border-top: 1px solid #efefef;
		}
		
		#chatingWrap .btmSend input {
				width: calc(100% - 70px);
				height: 36px;
				float: left;
				background: #ffffff;
				border: 1px solid #c8c8c8;
				border-radius: 6px;
				box-sizing: border-box;
				margin: 5px 0 0 8px;
				padding: 0 5px;
		}
		
		#chatingWrap .btmSend button {
				width: 50px;
				height: 36px;
				float: right;
				background: #1978d0;
				color: #ffffff;
				font-size: 1.4rem;
				border-radius: 6px;
				box-sizing: border-box;
				margin: 5px 8px 0 0;
		}
		
		/* 聊天对话 */
		#chatingWrap .chatingCont {
				position: absolute;
				display: block;
				top: 0px;
				bottom: 0px;
				width: 100%;
		}
		
		#chatingWrap .chatingCont .chating {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0px;
				bottom: 0px;
				overflow-y: auto;
				-webkit-overflow-scrolling: touch;
		}
		
		#chatingWrap .chatingCont ul {
				width: 100%;
				height: auto;
				padding-bottom: 46px;
				padding-top: 100px;
				
		}
		
		#chatingWrap .chatingCont ul li {
				width: 100%;
				height: auto;
				overflow: hidden;
				padding: 6px 0;
		}
		
		#chatingWrap .chatingCont ul .user .tx {
				width: 31px;
				height: 31px;
				border-radius: 100px;
				overflow: hidden;
				float: left;
				margin: 0 0 6px 12px;
		}
		
		#chatingWrap .chatingCont ul .user .tx img {
				width: 31px;
				height: 31px;
				float: left;
		}
		
		#chatingWrap .chatingCont ul .user .rt {
				width: auto;
				max-width: 63%;
				float: left;
				height: auto;
				position: relative;
				margin-left: 8px;
				background: #ffffff;
				border: 1px solid #f3f3f3;
				border-radius: 3px;
		}
		
		#chatingWrap .chatingCont ul .user .rt p {
				max-width: 100%;
				padding: 9px 11px 9px 11px;
				letter-spacing: 0;
				line-height: 18px;
				text-align: justify;
				font-size: 1.5rem;
				color: #333333;
				box-sizing: border-box;
		}
		
		#chatingWrap .chatingCont ul .user .rt .imgMeg {
				max-width: calc(100% - 22px);
				margin: 9px 11px 9px 11px;
		}
		
		#chatingWrap .chatingCont ul .user .rt .jiao {
				width: 100%;
		}
		
		#chatingWrap .chatingCont ul .lawyer .tx {
				width: 31px;
				height: 31px;
				border-radius: 100px;
				overflow: hidden;
				float: right;
				margin: 0 12px 0 0;
		}
		
		#chatingWrap .chatingCont ul .lawyer .tx img {
				width: 31px;
				height: 31px;
				float: left;
		}
		
		#chatingWrap .chatingCont ul .lawyer .rt {
				width: auto;
				max-width: 63%;
				float: right;
				height: auto;
				background: #a0e75a;
				border: 1px solid #74be50;
				border-radius: 3px;
				position: relative;
				margin-right: 8px;
		}
		
		#chatingWrap .chatingCont ul .lawyer .rt p {
				max-width: 100%;
				padding: 9px 11px 9px 11px;
				letter-spacing: 0;
				line-height: 18px;
				text-align: justify;
				font-size: 1.5rem;
				color: #333333;
				box-sizing: border-box;
		}
		
		#chatingWrap .chatingCont ul .lawyer .rt .imgMeg {
				max-width: calc(100% - 22px);
				margin: 9px 11px 9px 11px;
		}
		
		#chatingWrap .chatingCont ul .lawyer .rt .jiao {
				height: 10px;
				position: absolute;
				right: -5px;
				top: 9px;
		}
		
		.my-gallery {
				width: 100%;
				
		}
		
		.my-gallery img {
				width: 100%;
				height: auto;
		}
		
		.my-gallery figure {
				display: block;
				margin: 0 5px 5px 0;
				width: 100%;
		}
		
		.my-gallery figcaption {
				display: none;
		}

</style>