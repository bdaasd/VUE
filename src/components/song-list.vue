<template>
  <div class="song-list">
    <ul>
      <li
        v-for="(item, idx) in songs"
        class="item"
        :class="[isClick &&  currentIdx===idx ?'bgColor': '']"
        @click.stop="selectSong(item, idx)"
        :key="idx"
      >
        <div class="content">
          <div class="index">{{ idx + 1 }}</div>
          <div>
            <h2 class="name">{{ item.songname }}</h2>
            <p class="desc">{{ item.singer }} ~ {{ item.albumname }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      isClick: false
    }
  },
  props: {
    songs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapGetters('player', ['currentIdx'])
  },
  methods: {
    ...mapActions('player', ['selectPlay']),
    selectSong(song, idx) {
      // 点击背景颜色闪动
      this.isClick = true
      if (!song.purl) {
        this.$toast('未找到该资源')
        return
      }
      // 提交action -  selectPlay
      this.selectPlay({
        list: this.songs,
        idx
      })
      setTimeout(() => {
        this.isClick = false
      }, 300)
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~@assets/stylus/variable'
@import '~@assets/stylus/mixin'
.song-list
  .item
    display flex
    align-items center
    box-sizing border-box
    height 64px
    font-size $font-size-medium
    // .rank {
    // flex: 0 0 25px;
    // width: 25px;
    // margin-right: 30px;
    // text-align: center;

    // .icon {
    // display: inline-block;
    // width: 25px;
    // height: 24px;
    // background-size: 25px 24px;

    // &.icon0 {
    // bg-image('first');
    // }

    // &.icon1 {
    // bg-image('second');
    // }

    // &.icon2 {
    // bg-image('third');
    // }
    // }

    // .text {
    // color: $color-theme;
    // font-size: $font-size-large;
    // }
    // }
    .content
      flex 1
      line-height 20px
      overflow hidden
      display flex
      align-items center
      .index
        margin-right 15px
      .name
        no-wrap()
        color #222
        font-size 16px
      .desc
        no-wrap()
        margin-top 4px
        color #888
  .bgColor
    background #f3f3f3
</style>