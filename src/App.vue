<script>
  export default {
    created () {
    }
  }
</script>

<style>
  page {
    height: 100%;
  }

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #e7e7e7;
    /*align-items: center;*/
    /*justify-content: space-between;*/
    /*padding: 200rpx 0;*/
    /*box-sizing: border-box;*/
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }

  .bg-c-white {
    background-color: white
  }

  .ripple {
    position: relative;
    overflow: hidden;
  }

  .ripple:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
  }

  .ripple:active:after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
  }
</style>
