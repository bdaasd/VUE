<template>
  <div class="music-list">
    <div class="back" @click='back'>
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bgimage" :style='setBgImage' ref='bgImage'>
      <div class="filter"></div>
    </div>
    <!-- song-list -->
    <m-scroll class='list' ref='list'>
      <div class='song-list-wrapper'>
        <song-list :songs='songs'/>
      </div>
      <div class='loading-container'>
        <m-loading v-show='!songs.length'/>
      </div>
    </m-scroll>
  </div>
</template>

<script>
import SongList from '@components/song-list'
import MLoading from '@base/loading'
import MScroll from './m-scroll'

export default {
  components: {
    SongList,
    MScroll,
    MLoading
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '未知歌手'
    },
    bgImage: {
      type: String,
      // eslint-disable-next-line global-require
      default: require('@assets/images/qq2.png')
    },
    songs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    setBgImage() {
      return `${this.bgImage}`
    }
  },
  mounted() {
    const top = this.$refs.bgImage.clientHeight
    this.$refs.list.$el.style.top = `${top}px`
  }
}
</script>

<style scoped lang="stylus">
@import '~@assets/stylus/variable'
@import '~@assets/stylus/mixin'
.music-list
  position fixed
  z-index 100
  top 0
  left 0
  bottom 0
  right 0
  background $color-background
  .back
    position absolute
    top 0
    left 6px
    z-index 50
    .icon-back
      display block
      padding 10px
      font-size $font-size-large-x
      color $color-theme
  .title
    position absolute
    top 0
    left 10%
    z-index 40
    width 80%
    no-wrap()
    text-align center
    line-height 40px
    font-size $font-size-large
    color #fff
  .bgimage
    position relative
    width 100%
    height 0
    padding-top 70%
    transform-origin top
    background-size cover
    .play-wrapper
      position absolute
      bottom 20px
      z-index 50
      width 100%
      .play
        box-sizing border-box
        width 135px
        padding 7px 0
        margin 0 auto
        text-align center
        border 1px solid $color-theme
        color $color-theme
        border-radius 100px
        font-size 0
        .icon-play
          display inline-block
          vertical-align middle
          margin-right 6px
          font-size $font-size-medium-x
        .text
          display inline-block
          vertical-align middle
          font-size $font-size-small
  .bg-layer
    position relative
    height 100%
    background #fff
  .list
    position fixed
    top 0
    bottom 0
    width 100%
    background #fff
    overflow hidden
    .song-list-wrapper
      padding 20px 30px
    .loading-container
      display flex
      align-items center
      justify-content center
      transform translateY(100%)
</style>