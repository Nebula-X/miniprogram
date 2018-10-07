<template>
  <div class="container">
    <scroll-view :style="{height:scrollHeight+'px'}" scroll-y="true" @scrolltolower="loadMoreData">
      <div v-for="(item,index) in deviceList" class="device-item ripple" @click="itemClick(item.device_id)">
        <div class="device-item-detail">
          <span class="text-span">{{item.name}}</span>
          <!--2为绿图标-->
          <img v-if="item.status == 2" src="../../../../static/images/status_on.png">
          <!--1为红图标-->
          <img v-if="item.status == 1" src="../../../../static/images/status_unusual.png">
        </div>
        <i-icon type="enter" size="24" color="#80848f"></i-icon>
      </div>
      <div v-if="loading" :class="[loadingActive ? 'loading':'hidden']">
        <img src="../../../../static/images/loading.gif"/>
        {{loadingMsg}}
      </div>
      <div v-if="!next" :class="[completedActive ? 'completed':'hidden']">已加载全部数据</div>
    </scroll-view>
    <div class="round-click" @click="refreshList">
      <img src="../../../../static/images/refurbish.png"/>
    </div>
    <!--每一个页面都要添加message窗体，用于显示消息-->
    <i-message id="message"/>
  </div>
</template>

<script>
  import { deviceList } from '../../../api/device'
  import { validateErrCode } from '../../../utils/index'
  import store from '../../../store/index'

  const {$Message} = require('../../base/index')

  export default {
    data () {
      return {
        loadingActive: true,
        completedActive: true,
        scrollHeight: 0,
        deviceList: [],
        page: 1,
        next: true,
        loading: false,
        loadingMsg: ''
      }
    },
    components: {},
    methods: {
      loadMoreData () {
        this.loadData(false)
      },
      refreshList () {
        this.loadData(true)
      },
      // 计算 scroll-view 的高度
      computeScrollViewHeight () {
        // https://blog.csdn.net/weixin_41871290/article/details/81103253
        this.scrollHeight = wx.getSystemInfoSync().windowHeight - 70
      },
      // 加载数据列表
      loadData (isRefreshFlag) {
        if (this.loading) {
          return
        }
        // 判断是否是刷新数据，如果是刷新数据，那么从第一页开始
        if (isRefreshFlag) {
          this.page = 1
          this.loadingMsg = '加载中 ...'
        } else {
          // 如果为加载更多，同时判断是否还有下一页，如果没有下一页，直接结束语句
          if (!this.next) {
            return
          }
          this.loadingMsg = '正在载入更多 ...'
        }
        this.loading = true
        // 加载数据列表
        deviceList(this.page).then(res => {
          let that = this
          let {reqFlag, data} = validateErrCode($Message, res)
          if (reqFlag) {
            this.page = data.page
            this.next = data.next
            if (this.page === 1) {
              this.deviceList.splice(0, this.deviceList.length) // 清空数组
            }
            data.list.forEach(function (value, index, array) {
              that.deviceList.push(value)
            })
          }
          this.loading = false
        }).catch(errors => {
          this.loading = false
        })
      },
      itemClick (value) {
        wx.navigateTo({url: '/pages/device/info/main?id=' + value})
      }
    },
    created () {
    },
    mounted () {
      // 计算界面的高度
      this.computeScrollViewHeight()
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
  .text-span
    margin-right 12px

  .round-click
    bottom 24px
    right 24px
    position fixed
    z-index 9
    display flex
    justify-content center
    align-items center
    img
      height 40px
      width 40px

  .device-item
    font-size 15px
    color #333333
    margin-top 1px
    display flex
    padding 12px 8px 12px 12px
    justify-content space-between
    align-items center
    background-color white
    img
      height 16px
      width 16px
    .device-item-detail
      display flex
      align-items center

  .hidden
    display none

  scroll-view
    overflow auto
    width 100%
    height 1110 rpx

  .loading
    height 44px
    margin-top 1px
    display flex
    justify-content center
    align-items center
    font-size 14px
    color #999999
    background-color white
    img
      width 26px
      height 26px
      margin-right 12px

  .completed
    margin-top 1px
    height 44px
    display flex
    justify-content center
    align-items center
    font-size 14px
    color #999999
    background-color white
</style>
