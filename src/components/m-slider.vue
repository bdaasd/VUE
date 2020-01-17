<template>
  <div class="slider">
    <van-swipe class="slider-group" :autoplay="3000">
      <van-swipe-item class="slider-item" v-for='(item, idx) in sliderlist' :key='idx'>
        <img :src='item.picUrl'/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    sliderlist: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style scoped lang="stylus">
@import '~@assets/stylus/variable'
.slider
  min-height 1px
  .slider-group
    position relative
    overflow hidden
    white-space nowrap
    .slider-item
      float left
      box-sizing border-box
      overflow hidden
      text-align center
      a
        display block
        width 100%
        overflow hidden
        text-decoration none
      img
        display block
        width 100%
</style>