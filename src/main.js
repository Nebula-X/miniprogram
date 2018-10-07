import Vue from 'vue'
import App from './App'
import store from './store/index'

Vue.config.productionTip = false
App.mpType = 'app'

// 添加Vuex
Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
