// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import './analog-data/options.js'
import './components'
import './base/base.scss'
import './base/item.scss'
import './base/iconfont.js'

import Vue from 'vue'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<router-view/>',
})

