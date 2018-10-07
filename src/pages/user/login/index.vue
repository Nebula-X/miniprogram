<template>
  <div class="container bg-c-white">
    <div class="imgPanel">
      <img src="../../../../static/images/logo.png" class="logo"/>
    </div>
    <input class="inputForm m-top-240 p-left-44" v-model="userName" placeholder="请输入手机号码"/>
    <div class="septalLine"></div>
    <input class="inputForm m-top-50 p-left-44" v-model="passWord" password placeholder="请输入登录密码"/>
    <div class="septalLine"></div>
    <i-button @click="handleLogin" type="primary" shape="circle" class="m-top-50">登 录</i-button>
    <!--每一个页面都要添加message窗体，用于显示消息-->
    <i-message id="message"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { validateErrCode } from '../../../utils/index'
  import { login } from '../../../api/user'

  const {$Message} = require('../../base/index')
  export default {
    data () {
      return {
        userName: '',
        passWord: ''
      }
    },
    components: {},
    methods: {
      ...mapActions([
        'loginSuccess'
      ]),
      handleLogin () {
        // 判断登录表单的内容
        if (this.userName === '') {
          $Message({content: '用户名不能为空', type: 'error'})
          return
        }
        if (this.passWord === '') {
          $Message({content: '密码不能为空', type: 'error'})
          return
        }
        if (this.passWord.length < 6) {
          $Message({content: '密码不能小于6位', type: 'error'})
          return
        }
        // 进行登录
        login(this.userName, this.passWord).then(res => {
          let {reqFlag, data} = validateErrCode($Message, res)
          if (reqFlag) {
            // 保存data数据到vuex
            this.loginSuccess({accessToken: data.token, username: data.username})
            this.passWord = '' // 将密码置空
            // 转跳页面到首页
            wx.switchTab({url: '../../home/index/main'})
          }
        })
      }
    },
    created () {
    },
    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '线路宝·MES',
        path: 'pages/home/index/main'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .imgPanel
    display flex
    flex-direction column
    justify-content center
    align-items center
    padding-top 44px
    .logo
      width: 138px
      height 59px

  .inputForm
    color #333333
    font-size 15px

  .m-top-240
    margin-top 120px

  .m-top-50
    margin-top 25px

  .p-left-44
    padding-left 22px

  .septalLine
    height 2px
    background-color #e7e7e7
</style>
