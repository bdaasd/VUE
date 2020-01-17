<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    // 设置滚动效果
    /* 1 : 非实时派发滚动事件
       2 : 实时派发滚动事件
       3 : 在动画过程中也会派发滚动事件
    */

    probeType: {
      type: Number,
      default: 2
    }
  },
  methods: {
    // 初始化BScroll
    _initScroll() {
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: this.probeType,
        click: true,
        momentum: true, // 开启滚动动画
        swipeTime: 1500 // 滚动动画时长
      })
    },
    enable() {
      // 启用 better-scroll
      this.scroll && this.scroll.enable()
    },
    disable() {
      // 禁用 better-scroll
      this.scroll && this.scroll.disable()
    },
    refresh() {
      // 刷新 better-scroll
      this.scroll && this.scroll.refresh()
    },
    scrollToElement(elem, ms) {
      // 滚动到某个元素
      this.scroll && this.scroll.scrollToElement(elem, ms)
    }
  },
  mounted() {
    setTimeout(() => {
      // 延时加载, 确保DOM加载完成
      this._initScroll()
    }, 20)
  }
}
</script>
