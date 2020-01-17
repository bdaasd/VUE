<template>
 <!-- 进度条总宽度 -->
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <!-- 进度显示条 -->
      <div class="progress" ref="progress"></div>
      <!-- 进度按钮 -->
      <div class="progress-btn-wrapper" ref="progressBtn">
        <div class="progress-btn"
          @touchstart.prevent='touchs'
          @touchmove.prevent='touchm'
          @touchend='touche'
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  methods: {
    touchs(e) {
      this.touches.isStart = true
      this.touches.startx = e.touches[0].pageX
      // 记录当前进度条显示
      this.touches.progress = this.$refs.progress.clientWidth
    },
    touchm(e) {
      if (!this.touches.isStart) {
        return
      }
      // 算出滑动距离
      this.touches.distance = e.touches[0].pageX - this.touches.startx
      // 计算出滑动的最大距离和最小距离
      const offset = Math.min(Math.max(0, this.touches.distance + this.touches.progress),
        this.$refs.progressBar.clientWidth - 16)
      // 让进度按钮滑动起来
      this.$refs.progressBtn.style.transform = `translateX(${offset}px)`
      this.$refs.progress.style.width = `${offset}px`
    },
    touche() {
      this.touches.isStart = false
      // 改变后的播放进度  /  播放进度总宽度
      const pw = this.$refs.progressBar.clientWidth - 16;
      const percent = (this.touches.progress + this.touches.distance) / pw
      // 向上派发 重新计算后的 percent
      this.$emit('percentChange', percent)
    }
  },
  created() {
    // 保存的是touch事件产生的数据
    this.touches = {}
  },
  watch: {
    percent(newVal) {
      // touch时权重高于自动播放
      if (this.touches.isStart) {
        return
      }
      // (进度总宽度 - 播放按钮宽度) * 播放百分比 = 实际播放进度
      const pw = this.$refs.progressBar.clientWidth - 16;
      const bw = this.$refs.progressBtn
      const offset = pw * newVal
      // 播放按钮播放起来 transform : translateX
      bw.style.transform = `translateX(${offset}px)`
      // 兼容写法
      bw.style.webkitTransform = `translateX(${offset}px)`
      // 设置进度显示
      this.$refs.progress.style.width = `${offset}px`
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~@assets/stylus/variable'
.progress-bar
  height 30px
  .bar-inner
    position relative
    top 13px
    height 4px
    background rgba(255, 255, 255, 0.5)
    .progress
      position absolute
      height 100%
      background $color-theme
    .progress-btn-wrapper
      position absolute
      left -8px
      top -13px
      width 30px
      height 30px
      .progress-btn
        position relative
        top 7px
        left 7px
        box-sizing border-box
        width 16px
        height 16px
        border 3px solid #fff
        border-radius 50%
        background #fff
</style>