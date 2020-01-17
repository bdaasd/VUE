<template>
  <div class="player" v-if='playlist.length'>
    <!-- normal -->
    <transition name='normal'>
      <div class="normal-player" v-show='fullScreen'>
        <div class="background">
          <img width="100%" height="100%" :src='currentSong.albummid'/>
        </div>
        <!-- 返回按钮和歌曲信息 -->
        <div class="top">
          <div class="back" @click='toggleScreen'>
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{ currentSong.songname }}</h1>
          <h2 class="subtitle">{{ currentSong.singer }}</h2>
        </div>
        <!-- 中间播放的CD -->
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd" :class='rotateCD'>
                <img class="image" :src='currentSong.albummid' alt />
              </div>
            </div>
          </div>
        </div>
        <!-- 底部的按钮 -->
        <div class="bottom">
          <!-- 进度条 -->
          <div class="progress-wrapper">
            <span class="time time-l">
              {{ formatTime(currentTime) }}
            </span>
            <div class="progress-bar-wrapper">
              <!-- progress-bar组件 -->
              <progress-bar :percent='percent' @percentChange='changePercent'/>
            </div>
            <span class="time time-r">
              {{ formatTime(currentSong.interval) }}
            </span>
          </div>
          <!-- 指示器 -->
          <div class="operators">
            <div class="icon i-left">
              <!-- 播放模式 -->
              <i :class="modeIcon" @click='toggleMode'></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev" @click='toggleSong("prev")'></i>
            </div>
            <div class="icon i-center">
              <i :class="playIcon" @click='togglePlay'></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next" @click='toggleSong("next")'></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- mini -->
    <transition name='mini'>
      <div class="mini-player"
        v-show='!fullScreen'
        @click='toggleScreen'>
        <div class="icon">
          <img width="40" height="40" :src='currentSong.albummid' :class='rotateCD'/>
        </div>
        <div class="text">
          <h2 class="name">{{ currentSong.songname }}</h2>
          <p class="desc">{{ currentSong.singer }}</p>
        </div>
        <div class="control">
          <i :class="playIcon+'-mini'" @click.stop="togglePlay"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <!-- 播放 audio -->
    <audio
      :src="currentSong.purl"
      ref='audio'
      @timeupdate.prevent='timeUpdate'
      @canplay="canPlay"
      @ended='playEnd'
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { mode } from '@assets/js/paramconfig'
import ProgressBar from './progress-bar'

export default {
  data() {
    return {
      currentTime: 0,
      // 标志位 表示歌曲缓冲
      songReady: false
    }
  },
  // mixins
  components: {
    ProgressBar
  },
  computed: {
    ...mapGetters('player', [
      'fullScreen',
      'currentSong',
      'playlist',
      'playing',
      'currentIdx',
      'pmode'
    ]),
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    percent() { // 计算播放百分比
      // 当前播放时间 / 歌曲总时长 = 播放百分比
      return this.currentTime / this.currentSong.interval
    },
    rotateCD() {
      return this.playing ? 'play' : 'play pause'
    },
    modeIcon() {
      // eslint-disable-next-line no-nested-ternary
      return this.pmode === mode.order ? 'icon-sequence'
        : this.pmode === mode.loop ? 'icon-loop'
          : 'icon-random'
    }
  },
  methods: {
    ...mapMutations('player', [
      'setFullScreen',
      'setPlaying',
      'setCurrentIdx',
      'setPmode'
    ]),
    toggleScreen() {
      // 提交 setFullScreen
      this.setFullScreen(!this.fullScreen)
    },
    togglePlay() {
      this.setPlaying(!this.playing)
    },
    toggleSong(flag) {
      console.log(this.songReady)
      if (!this.songReady && this.currentSong.purl) {
        return
      }
      // 做歌曲切换 prev | next
      if (flag === 'prev') {
        let idx = this.currentIdx - 1
        if (idx < 0) {
          idx = this.playlist.length - 1
        }
        this.setCurrentIdx(idx)
      } else if (flag === 'next') {
        let idx = this.currentIdx + 1
        if (idx > this.playlist.length - 1) {
          idx = 0
        }
        this.setCurrentIdx(idx)
      }
      if (!this.playing) {
        this.togglePlay(!this.playing)
      }
      // 还原标志位
      this.songReady = false
    },
    formatTime(t) {
      t = Math.floor(t)
      let m = Math.floor(t / 60)
      let s = t % 60
      if (m < 10) {
        m = `0${m}`
      }
      if (s < 10) {
        s = `0${s}`
      }
      return `${m}:${s}`
    },
    timeUpdate(e) { // 播放时间变化事件
      // currentTime 当前播放时间
      this.currentTime = e.target.currentTime
    },
    changePercent(p) {
      // 直接设置 audio 的当前时间 currentTime
      // currentTime = 百分比 * 总时长
      this.$refs.audio.currentTime = p * this.currentSong.interval
    },
    canPlay() { // 表示歌曲以缓冲好
      this.songReady = true
    },
    playEnd() {
      if (this.pmode === mode.loop) {
        this.$refs.audio.currentTime = 0
        if (this.songReady) {
          this.$refs.audio.play()
        }
        return
      }
      // 自动下一首
      this.toggleSong('next')
    },
    toggleMode() {
      // 提交mutation setPmode
      // click =  0 -> 1 -> 2 -> 0
      const m = (this.pmode + 1) % 3
      this.setPmode(m)
    }
  },
  watch: {
    currentSong(newVal) {
      if (!newVal.purl) {
        this.toggleSong('next')
      }
      // 延迟play方法的调用，确保audio标签src有值，才能调用play
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing(newVal) { // 监听 playing 的变化
      this.$nextTick(() => {
        const { audio } = this.$refs
        newVal ? audio.play() : audio.pause()
      })
    }
  }
}
</script>

<style scoped lang="stylus" >
@import '~@assets/stylus/variable'
@import '~@assets/stylus/mixin'
.player
  .normal-player
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 150
    background $color-background
    .background
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index -1
      opacity 0.9
      filter blur(40px)
    .top
      position relative
      margin-bottom 25px
      .back
        position absolute
        top 0
        left 6px
        z-index 50
        .icon-back
          display block
          padding 9px
          font-size $font-size-large-x
          color $color-theme
          transform rotate(-90deg)
      .title
        width 70%
        margin 0 auto
        line-height 40px
        text-align center
        no-wrap()
        font-size $font-size-large
        color #f2f2f2
      .subtitle
        line-height 20px
        text-align center
        font-size $font-size-medium
        color #f2f2f2
    .middle
      position fixed
      width 100%
      top 80px
      bottom 170px
      white-space nowrap
      font-size 0
      .middle-l
        display inline-block
        vertical-align top
        position relative
        width 100%
        height 0
        padding-top 80%
        .cd-wrapper
          position absolute
          left 10%
          top 0
          width 80%
          height 100%
          .cd
            width 100%
            height 100%
            box-sizing border-box
            border 10px solid rgba(255, 255, 255, 0.1)
            border-radius 50%
            &.play
              animation rotate 20s linear infinite
            &.pause
              animation-play-state paused
            .image
              position absolute
              left 0
              top 0
              width 100%
              height 100%
              border-radius 50%
        .playing-lyric-wrapper
          width 80%
          margin 30px auto 0 auto
          overflow hidden
          text-align center
          .playing-lyric
            height 20px
            line-height 20px
            font-size $font-size-medium
            color #f9f9f9
      .middle-r
        display inline-block
        vertical-align top
        width 100%
        height 100%
        overflow hidden
        .lyric-wrapper
          width 80%
          margin 0 auto
          overflow hidden
          text-align center
          .text
            line-height 32px
            color rgba(250, 250, 250, 0.7)
            font-size $font-size-medium-x
            &.current
              color #fff
    .bottom
      position absolute
      bottom 20px
      width 100%
      .dot-wrapper
        text-align center
        font-size 0
        .dot
          display inline-block
          vertical-align middle
          margin 0 4px
          width 8px
          height 8px
          border-radius 50%
          background $color-text-l
          &.active
            width 20px
            border-radius 5px
            background $color-text-ll
      .progress-wrapper
        display flex
        align-items center
        width 86%
        margin 0px auto
        padding 10px 0
        .time
          color #f2f2f2
          font-size $font-size-small
          flex 0 0 30px
          line-height 30px
          width 30px
          &.time-l
            text-align left
          &.time-r
            text-align right
        .progress-bar-wrapper
          flex 1
          margin 0 10px
      .operators
        display flex
        align-items center
        .icon
          flex 1
          color $color-theme
          &.disable
            color $color-theme-d
          i
            font-size 30px
        .i-left
          text-align right
        .i-center
          padding 0 20px
          text-align center
          i
            font-size 40px
        .i-right
          text-align left
        .icon-favorite
          color $color-sub-theme
    &.normal-enter-active, &.normal-leave-active
      transition all 0.4s
      .top, .bottom
        transition all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity 0
      .top
        transform translate3d(0, -100px, 0)
      .bottom
        transform translate3d(0, 100px, 0)
  .mini-player
    display flex
    align-items center
    position fixed
    left 0
    bottom 0
    z-index 180
    width 100%
    height 60px
    background #fff
    box-shadow 0 -5px 10px rgba(0, 0, 0, 0.1)
    &.mini-enter-active, &.mini-leave-active
      transition all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity 0
    .icon
      flex 0 0 40px
      width 40px
      padding 0 10px 0 20px
      img
        border-radius 50%
        &.play
          animation rotate 10s linear infinite
        &.pause
          animation-play-state paused
    .text
      display flex
      flex-direction column
      justify-content center
      flex 1
      line-height 20px
      overflow hidden
      .name
        margin-bottom 2px
        no-wrap()
        font-size $font-size-medium
        color $color-text
      .desc
        no-wrap()
        font-size $font-size-small
        color $color-text-d
    .control
      flex 0 0 30px
      width 30px
      padding 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size 30px
        color #31c27c
      .icon-mini
        font-size 32px
        position absolute
        left 0
        top 0
@keyframes rotate
  0%
    transform rotate(0)
  100%
    transform rotate(360deg)
</style>