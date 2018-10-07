<template>
  <div class="container bg-white">
    <device-header :name="data.name" :status="data.status" :status_title="data.status_title" :showTechnics="false"
                   :updateTime="data.update_at" :updateTimeText="data.updateTimeText"></device-header>
    <div class="func-item">
      <div class="item-panel">
        <div class="item bg-00c2d9 ripple" @click="enterPage(1)">
          <img src="/static/images/icon-1.png"/>
          <div>产能</div>
        </div>
        <div class="separate"></div>
        <div class="item bg-f3c400 ripple" @click="enterPage(2)">
          <img src="/static/images/icon-2.png"/>
          <div>工艺</div>
        </div>
      </div>
      <div class="item-panel">
        <div class="item bg-de6f00 ripple" @click="enterPage(3)">
          <img src="/static/images/icon-3.png"/>
          <div>报警</div>
        </div>
        <div class="separate"></div>
        <div class="item bg-00d58e ripple" @click="enterPage(4)">
          <img src="/static/images/icon-4.png"/>
          <div>保养</div>
        </div>
      </div>
      <div class="item-panel" @click="enterPage(5)">
        <div class="item bg-008a5e ripple">
          <img src="/static/images/icon-5.png"/>
          <div>能耗</div>
        </div>
        <div class="separate"></div>
        <div class="item2">
        </div>
      </div>
      <div class="m-top-8"></div>
    </div>
    <!--每一个页面都要添加message窗体，用于显示消息-->
    <i-message id="message"/>
  </div>
</template>

<script>
  import DeviceHeader from '../../../components/device-header.vue'
  import { deviceInfo } from '../../../api/device'
  import { validateErrCode } from '../../../utils/index'
  import { format2Date } from '../../../utils/format'

  const {$Message} = require('../../base/index')
  export default {
    data () {
      return {
        id: '',
        data: {}
      }
    },
    onLoad (options) {
      this.id = options.id
    },
    components: {
      DeviceHeader
    },
    mounted () {
      deviceInfo(this.id).then(res => {
        let {reqFlag, data} = validateErrCode($Message, res)
        if (reqFlag) {
          let updateTime = format2Date(data.update_at, 'MM-dd hh:mm')
          this.data = Object.assign(data, {updateTimeText: updateTime})
        }
      })
    },
    methods: {
      enterPage (value) {
        switch (value) {
          case 1:
            let page = '/pages/web/index/main'
            let url = 'https://apiapiapi.pcbbao.com/vue/#/capacity'
            let params = encodeURIComponent('id=' + this.id)
            wx.navigateTo({url: page + '?' + 'url=' + url + '&params=' + params})
            break
          case 2:
            url = '/pages/device/technics/main'
            url = url + '?' + 'id=' + this.id
            wx.navigateTo({url: url})
            break
          case 3:
            url = '/pages/device/alarm/main'
            url = url + '?' + 'id=' + this.id
            wx.navigateTo({url: url})
            break
          case 4:
          case 5:
          default:
            $Message({content: '抱歉,该功能暂未开放', type: 'error'})
            break
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .m-top-8
    margin-top 6px

  .func-item
    flex 1
    display flex
    flex-direction column

  .bg-white
    background-color #ffffff

  .bg-00c2d9
    background-color #00c2d9

  .bg-f3c400
    background-color #f3c400

  .bg-de6f00
    background-color #de6f00

  .bg-00d58e
    background-color #00d58e

  .bg-008a5e
    background-color #008a5e

  .item-panel
    flex 1
    padding 5px 5px 0px 5px
    display flex
    .item2
      flex 1
    .item
      box-shadow 5px 5px 5px #e8e8e8
      border-radius 8px
      flex 1
      display flex
      justify-content center
      align-items center
      color #ffffff
      font-size 25px
      img
        width 60px
        height 60px
        margin-right 30px
    .separate
      width 5px
</style>
