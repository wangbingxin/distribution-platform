import Vue from 'vue'
import Router from 'vue-router'
import generateRoute from './util.js'
import role from '../jurisdiction'

import App from '../App'

// home 首页
import Home from '../view/Home/routes'

// 统计结算
import statistics from '../view/statistics/router/'

// 系统设置路由
import setting from '../view/setting/routes'

//运营推广模块
import promotion from '../view/promotion/routes'

//小说模块 (阅读器和文案)
import novel from '../view/novel/routes'

//账户模块
import passport from '../view/passport/routes.js'

import NotFound from '../view/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: { name: 'home' },
      component: App,
      children: [
        ...Home,
        ...promotion,
        ...statistics,
        ...setting
      ]
    },
    ...novel,
    ...passport,
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '*',
      redirect: { name: 'NotFound' },
    }
  ]
})

router.afterEach((route) => {
  document.body.scrollTop = 0
})

router.beforeEach((to, from, next) => {
  switch (role.route[to.name]) {
    case true:
      next()
      break;
    case false:
      next(role.shelter)
      break;
    case undefined:
      next()
      break;
  }
})


export default router