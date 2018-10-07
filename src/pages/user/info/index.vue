<template>
  <div class="container">
    <div class="user">
      <img src="../../../../static/images/avator.png">
      <div>{{user_name}}</div>
    </div>
    <i-button @click="exitApp" type="primary" shape="circle" class="m-top-50">退  出</i-button>
    <i-modal :visible="visible" @ok="handleOk" @cancel="handleClose">
      <view>退出账号</view>
    </i-modal>
    <!--每一个页面都要添加message窗体，用于显示消息-->
    <i-message id="message"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { userInfo } from '../../../api/user'
  import { validateErrCode } from '../../../utils/index'
  import store from '../../../store/index'

  const {$Message} = require('../../base/index')

  export default {
    data () {
      return {
        user_name: '',
        visible: false,
        loading: false
      }
    },
    components: {},
    computed: {
      ...mapGetters([
        'accessToken',
        'username'
      ])
    },
    methods: {
      ...mapActions([
        'logout'
      ]),
      exitApp () {
        this.visible = true
      },
      handleClose () {
        this.visible = false
      },
      handleOk () {
        this.visible = false
        this.logout()
        wx.redirectTo({url: '../login/main'})
      },
      loadData () {
        if (this.loading) {
          return
        }
        this.loading = true
        userInfo().then(res => {
          let {reqFlag, data} = validateErrCode($Message, res)
          if (reqFlag) {
            this.user_name = data.user_name
          }
          this.loading = false
          wx.stopPullDownRefresh({})
        }).catch(errors => {
          this.loading = false
          wx.stopPullDownRefresh({})
        })
      }
    },
    created () {
    },
    mounted () {
    },
    onShow () {
      let token = store.getters.accessToken
      if (!token) {
        wx.navigateTo({url: '/pages/user/login/main'})
        return
      }
      this.loadData(true)
    },
    onLoad () {
    },
    onPullDownRefresh () {
      this.loadData()
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
  .user
    display: flex
    align-items center
    background-color white
    padding 12px
    font-size 15px
    color #333333
    border-radius 8px
    margin 12px
    img
      width 60px
      height 60px
      margin-right 22px
</style>
