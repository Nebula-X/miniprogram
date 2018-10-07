// import Vue from 'vue'
import fly from '../utils/fly'

/**
 * 用户 -- 登录
 * @param userName
 * @param password
 * @returns {*}
 */
export const login = (userName, password) => {
  return fly.post('app_v1/default/login', {
    username: userName,
    password: password
  })
}

/**
 * 用户 -- 个人中心
 * @returns {*}
 */
export const userInfo = () => {
  return fly.post('app_v1/token/personal-center', {})
}
