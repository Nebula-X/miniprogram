<template>
  <div class="container">
    <div class="list-panel-title">
      <div class="title-item">名称</div>
      <div class="title-item">范围</div>
      <div class="title-item">实时</div>
      <div class="sperate"></div>
    </div>
    <div class="item ripple" v-for="(item,index) in list" @click="itemClick(item.name)">
      <div class="item-info">{{item.name}}</div>
      <div class="item-info">{{item.range}}</div>
      <div class="item-info">{{item.current}}</div>
      <i-icon type="enter" size="24" color="#80848f"></i-icon>
    </div>
    <!--每一个页面都要添加message窗体，用于显示消息-->
    <i-message id="message"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { technicsInfo } from '../../../api/device'
  import { validateErrCode } from '../../../utils/index'

  const {$Message} = require('../../base/index')

  export default {
    data () {
      return {
        id: '',
        data: {},
        loading: false,
        list: []
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
        technicsInfo(this.id).then(res => {
          let {reqFlag, data} = validateErrCode($Message, res)
          if (reqFlag) {
            this.data = data
            this.list = data.tech_list
          }
          this.loading = false
          wx.stopPullDownRefresh({})
        }).catch(errors => {
          this.loading = false
          wx.stopPullDownRefresh({})
        })
      },
      itemClick (value) {
        let page = '/pages/web/index/main'
        let url = 'https://apiapiapi.pcbbao.com/vue/#/technicsHistory'
        let params = encodeURIComponent('id=' + this.id + '&techname=' + value)
        wx.navigateTo({url: page + '?' + 'url=' + url + '&params=' + params})
      }
    },
    created () {
    },
    mounted () {
    },
    onShow () {
      this.loadData(true)
    },
    onLoad (options) {
      this.id = options.id
    },
    onPullDownRefresh () {
      this.loadData()
    }
  }
</script>

<style lang="stylus" scoped>
  .list-panel-title
    margin 12px 12px 0px 12px
    height 44px
    display flex
    border-top-left-radius 6px
    border-top-right-radius 6px
    background-color #283d49
    justify-content center
    align-items center
    .title-item
      font-size 16px
      color #ffffff
      text-align center
      flex 1

  .item
    padding-top 10px
    padding-bottom 10px
    display flex
    font-size 14px
    color #808080
    background-color #ffffff
    margin-left 12px
    margin-right 12px
    margin-top 1px
    .item-info
      flex 1
      display flex
      justify-content: center
      align-items center

  .sperate
    width 24px
    height 24px
</style>
