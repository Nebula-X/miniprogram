<template>
  <div class="container">
    <div class="info-panel">
      <div class="info-item">
        <div class="font-s-28">报警数</div>
        <div class="font-s-36">{{data.alarm_num}}</div>
      </div>
      <div class="info-item">
        <div class="font-s-28">已处理</div>
        <div class="font-s-36">{{data.processed_num}}</div>
      </div>
      <div class="info-item">
        <div class="font-s-28">报警率</div>
        <div class="font-s-36">{{data.alarm_rate}}</div>
      </div>
    </div>
    <div class="list">
      <scroll-view style="height:1075rpx;" scroll-y="true" @scrolltolower="loadMoreData">
        <div v-for="(item,index) in alarmList" class="item ripple" @click="itemClick(item.alarm_name)">
          <div class="date">{{item.alarm_time}}</div>
          <div class="detail">
            <div class="item-1">
              <span class="time">{{item.clear_time}}</span>
              <span class="status">{{item.alarm_type}}</span>
            </div>
            <div class="name">{{item.alarm_name}}</div>
          </div>
          <i-icon type="enter" size="30" color="#80848f"></i-icon>
        </div>
        <div v-if="loading" :class="[loadingActive ? 'loading':'hidden']">
          <img src="../../../../static/images/loading.gif"/>
          {{loadingMsg}}
        </div>
        <div v-if="!next" :class="[completedActive ? 'completed':'hidden']">已加载全部数据</div>
      </scroll-view>
    </div>
    <!--每一个页面都要添加message窗体，用于显示消息-->
    <i-message id="message"/>
  </div>
</template>

<script>
  import {alarmInfo} from '../../../api/device'
  import {validateErrCode} from '../../../utils/index'

  const {$Message} = require('../../base/index')
  export default {
    data () {
      return {
        id: '',
        data: {},
        alarmList: [],
        page: 1,
        next: true,
        loading: false,
        loadingMsg: '',
        loadingActive: true,
        completedActive: true
      }
    },
    onLoad (options) {
      this.id = options.id
    },
    onShow () {
      this.loadData(true)
    },
    components: {},
    mounted () {
    },
    methods: {
      loadMoreData () {
        this.loadData(false)
      },
      refreshList () {
        this.loadData(true)
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
        alarmInfo(this.id, this.page).then(res => {
          let that = this
          let {reqFlag, data} = validateErrCode($Message, res)
          if (reqFlag) {
            this.page = data.page
            this.next = data.next
            data = data.return_data[0]
            this.data = data
            if (this.page === 1) {
              this.alarmList.splice(0, this.alarmList.length) // 清空数组
            }
            data.data.forEach(function (value, index, array) {
              that.alarmList.push(value)
            })
          }
          this.loading = false
        }).catch(errors => {
          this.loading = false
        })
      },
      itemClick (value) {
        let page = '/pages/web/index/main'
        let url = 'https://apiapiapi.pcbbao.com/vue/#/alarmHistory'
        let params = encodeURIComponent('id=' + this.id + '&alarm_name=' + value)
        wx.navigateTo({url: page + '?' + 'url=' + url + '&params=' + params})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .font-s-28
    font-size 14px

  .font-s-36
    font-size 18px

  .info-panel
    background-color #21a4e1
    height 65px
    display flex
    justify-content center
    align-items center
    .info-item
      flex 1
      color #ffffff
      display flex
      flex-direction column
      justify-content center
      align-items center

  .list
    flex 1

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

  .item
    margin-top 1px
    background-color #ffffff
    display flex
    height 87px
    justify-content center
    align-items center
    .date
      height 100%
      display flex
      justify-content center
      align-items center
      width 77px
      background-color #305972
      color #ffffff
      font-size 18px
    .detail
      padding-left 12px
      flex 1
      .item-1
        .time
          color #999999
          font-size 14px
          margin-right 12px
        .status
          background-color #21a4e1
          font-size 14px
          color #ffffff
          border-radius 10px
          padding 2px 4px
      .name
        margin-top 4px
        font-size 18px
        color #333333
</style>
