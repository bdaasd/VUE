<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs='hotSonglist'/>
  </transition>
</template>

<script>
import MusicList from '@components/music-list'
import { mapGetters } from 'vuex'
import getHotSonglist from '@api/hotSonglist'
import getPlayurl from '@api/playurl'
import Song from '@assets/js/songData'

export default {
  data() {
    return {
      hotSonglist: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters('hotRecom', ['hotRecomlist']),
    title() {
      if (this.hotRecomlist.dissid) {
        return this.hotRecomlist.creator.name
      }
      return ''
    },
    bgImage() {
      return `background-image:url(${this.hotRecomlist.imgurl})`
    }
  },
  methods: {
    _getHotSonglist() {
      // 页面刷新
      if (!this.hotRecomlist.dissid) {
        this.$router.back()
        return
      }
      getHotSonglist(this.hotRecomlist.dissid).then(res => {
        this.hotSonglist = this.handleSongs(res.cdlist[0].songlist)
      })
    },
    // 处理 热门歌曲列表数据
    handleSongs(list) {
      const ret = []
      const mid = []
      const purl = []
      const musicData = []
      list.forEach(item => {
        const albummid = item.album.mid
        const albumname = item.album.name
        const songid = item.id
        const songmid = item.mid
        const songname = item.name
        // const singer = item.singer
        // const interval = item.interval
        ret.push({
          albummid,
          albumname,
          songid,
          songmid,
          songname,
          // singer,
          // interval
        })
        mid.push(songmid)
      })
      // 发请求获取播放源
      this._getPlayurl(mid).then(res => {
        const data = res.midurlinfo
        // 遍历 res.midurlinfo 取出purl放入一个数组中
        data.forEach(item => {
          purl.push(item.purl)
        })
        // 必须保证 mid里面有内容
        ret.forEach((item, index) => {
          if (purl[index]) {
            const mDataUrl = {
              ...item,
              playurl: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/${purl[index]}`
            }
            // 把数据放入 ret 数组中
            musicData.push(new Song(mDataUrl))
          }
        })
      })
      return musicData
    },
    _getPlayurl(songmid) {
      // 调用 getPlaykey 接口
      return getPlayurl(songmid).then(res => {
        if (res.code === 0) {
          // 表示请求数据是正确的
          return Promise.resolve(res.req_0.data)
        }
      })
    }
  },
  created() {
    this._getHotSonglist()
  }
}
</script>

<style scoped lang="stylus">
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>