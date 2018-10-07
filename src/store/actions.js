/* eslint-disable */
import * as types from './mutation-types'
// 进行涉及到多个全局变量的复杂计算

export default {
  loginSuccess: ({commit}, {accessToken, username}) => {
    commit(types.SET_ACCESS_TOKEN, accessToken)
    commit(types.SET_USER_NAME, username)
  },
  logout: ({commit}) => {
    commit(types.SET_ACCESS_TOKEN, null)
    commit(types.SET_USER_NAME, null)
  }
}
