import { BaseURL } from '../config/webConfig.js'
import store from '../store/index'

var Fly = require('flyio/dist/npm/wx.js') // wx.js为flyio的微信小程序入口文件
var fly = new Fly() // 创建fly实例
// 添加拦截器
fly.interceptors.request.use((config, promise) => {
  // 给所有请求添加自定义header
  config.headers['X-Tag'] = 'flyio'
  config.headers['content-type'] = 'application/x-www-form-urlencoded'
  // 寻找vuex是否accessToken,如果存在添加到请求的参数上
  let token = store.getters.accessToken
  if (token !== null) {
    config.headers['token'] = token
  }
  return config
})
// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    return response.data
  }, (errs) => {
    // 发生网络错误后会走到这里
    return Promise.resolve('网络访问异常')
  }
)
// 配置请求基地址
fly.config.baseURL = BaseURL
fly.config.method = 'POST'

export default fly
