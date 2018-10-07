<template>
  <div class="container">
    <web-view :src="requestUrl"></web-view>
    <!--每一个页面都要添加message窗体，用于显示提示消息-->
    <i-message id="message"/>
  </div>
</template>

<script>
  // const {$Message} = require('../../base/index')
  import store from '../../../store/index'
  export default {
    data () {
      return {
        url: '',
        params: '',
        requestUrl: ''
      }
    },
    components: {},
    methods: {},
    created () {
    },
    mounted () {
    },
    onShow () {
    },
    onLoad (options) {
      this.url = options.url
      this.params = options.params
      if (!this.url) {
        wx.navigateBack({})
      }
      this.url = decodeURIComponent(this.url)
      this.params = decodeURIComponent(this.params)
      this.params = this.params + '&token=' + store.getters.accessToken
      this.requestUrl = this.url + '?' + this.params
    }
  }
</script>

<style lang="stylus" scoped>
</style>
