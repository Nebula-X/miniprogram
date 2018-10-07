import store from '../store/index'

export const ErrOK = 0 // 正常访问

/**
 * 用于校验接口返回的API 的错误码
 * 备注: 如果code !== ErrOK,返回False，否则返回True
 * @param vm  Vue实例对象，用于处理显示错误，或者是路由转跳页面
 * @param raw_data  从接口返回的数据,三段式{code:xxx,data:{},msg:''}
 * **
 * reqFlag = false      // 是否正常返回数据，如果code === ErrOK，那么reqFlag为true，否则为false
 * data = null          // 正常返回到接口的data，即三段式中data,已经去除了code和msg
 * code = null          // 如果reqFlag为false，就会返回三段式中的code
 * msg = ''             // 如果reqFlag为false，就会返回三段式中的msg
 */
export function validateErrCode ($Message, rawData) {
  let reqFlag = false // 是否正常返回数据，如果code === ErrOK，那么reqFlag为true，否则为false
  let data = null // 正常返回到接口的data，即三段式中data,已经去除了code和msg
  let code = null // 三段式中的code
  let msg = '' // 三段式中的msg
  if (rawData.code === ErrOK) {
    reqFlag = true
    data = rawData.data
    return {reqFlag, data, code, msg}
  } else {
    reqFlag = false
    code = rawData.code
    msg = rawData.msg
    switch (rawData.code) {
      case 30401: // 异地登录
        // 清除登录的相关资料
        store.dispatch('logout')
        wx.showModal({
          title: '提示',
          content: '账号登录异常，请进行登录操作',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              if (!validationIndex()) {
                wx.switchTab({url: '/pages/home/index/main'})
              } else {
                wx.navigateTo({url: '/pages/user/login/main'})
              }
            }
          }
        })
        return
      default:
        data = rawData.data
        $Message({
          content: rawData.msg,
          type: 'error'
        })
        return {reqFlag, data, code, msg}
    }
  }
}

/* eslint-disable */
function validationIndex () { // 判断当前是否为首页,若为首页那么我们不继续退出
  var pages = getCurrentPages()
  var length = pages.length
  if (length === 1) return true
  else return false
}

export default {
  validateErrCode,
}
