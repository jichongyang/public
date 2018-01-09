import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
		mode: 'history',
		scrollBehavior(to, from, savedPosition) {
				return {x: 0, y: 0}
		},
		routes: [
				{
						path: '/',
						name: 'isPcOrPhone',
						component: resolve => require(['@/components/isPcOrPhone/isPcOrPhone'], resolve),
						
						
				},
				{
						path: '/login',
						name: 'login',
						component: resolve => require(['@/components/login/login'], resolve),
						meta: {
								auth: true // 这里设置，当前路由需要校验
						}
				},
				{
						path: '/caseLists',
						name: 'caseLists',
						component: resolve => require(['@/components/caseLists/caseLists'], resolve),
						meta: {
								auth: true // 这里设置，当前路由需要校验
						}
				},
				{
						path: '/allZixun',
						name: 'allZixun',
						component: resolve => require(['@/components/allZixun/allZixun'], resolve),
						meta: {
								keepAlive: true,
								auth: true // 这里设置，当前路由需要校验
						},
				},
				{
						path: '/caseDetail',
						name: 'caseDetail',
						component: resolve => require(['@/components/caseDetail/caseDetail'], resolve),
						meta: {
								auth: true // 这里设置，当前路由需要校验
						}
						
				},
				{
						path: '/zixunDetail',
						name: 'zixunDetail',
						component: resolve => require(['@/components/zixunDetail/zixunDetail'], resolve),
						meta: {
								auth: true // 这里设置，当前路由需要校验
						}
				},
				{
						path: '/telZixun',
						name: 'telZixun',
						component: resolve => require(['@/components/telZixun/telZixun'], resolve),
						meta: {
								auth: true // 这里设置，当前路由需要校验
						}
				},
				{
						path: '/chating',
						name: 'chating',
						component: resolve => require(['@/components/chating/chating'], resolve),
						meta: {
								keepAlive: true,
								auth: true // 这里设置，当前路由需要校验
						}
				},
				{
						path: '/hxOutPop',
						name: 'hxOutPop',
						component: resolve => require(['@/components/hxOutPop/hxOutPop'], resolve)
				},
				{
						path: '/error',
						name: 'error',
						component: resolve => require(['@/components/error/error'], resolve)
						
				},
				{
						path: '/weChat',
						name: 'weChat',
						component: resolve => require(['@/components/weChat/weChat'], resolve),
						meta: {
								auth: true // 这里设置，当前路由需要校验
						}
				},
					{
						path: '/default',
						name: 'default',
						component: resolve => require(['@/components/default/default'], resolve),
						
				},

		]
})
