<template>
  <div class="singer-detail">
     <music-list :title='title' :bgImage='bgImage' :songs='songlist' />
  </div>
</template>

<script>
import MusicList from '@components/music-list'
import { mapGetters } from 'vuex'
import { getSongList } from '@api/singerApi'
import Song from '@assets/js/songData'
import { CODE_OK } from '@assets/js/paramconfig'
import playurl from '@api/playurl'

export default {
  data() {
    return {
      songlist: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters('singerModule', ['singerInfo']),
    title() {
      if (!this.singerInfo.title) {
        const info = JSON.parse(sessionStorage.getItem('info'))
        return info.sname
      }
      return this.singerInfo.sname
    },
    bgImage() {
      if (!this.singerInfo.headImg) {
        const info = JSON.parse(sessionStorage.getItem('info'))
        return info.headImg
      }
      return this.singerInfo.headImg
    }
  },
  methods: {
    _getSongList() {
      // 处理singermid不存在的情况
      // 使用 sessionStorage
      let info = this.singerInfo
      if (!this.singerInfo.mid) {
        // this.$router.back()
        // return
        info = JSON.parse(sessionStorage.getItem('info'))
      } else {
        sessionStorage.setItem('info', JSON.stringify(this.singerInfo))
      }
      // 传入歌手的 mid
      getSongList(info.mid).then(res => {
        if (res.code === CODE_OK) {
          this.songlist = this.handleSonglist(res.data.list)
        }
      })
    },
    _getPlayurl(songmid) {
      // 传入 songmid
      playurl(songmid).then(res => {
        console.log(res)
      })
    },
    // 解构musicData,将数据放入 Song 实例中
    handleSonglist(list) {
      // this._getPlayurl(songmid)
      const ret = []
      const smid = [];
      for (let i = 0; i < list.length; i++) {
        // 获取 songmid
        smid.push(list[i].musicData.songmid)
      }
      // 发请求传入 smid , 获取purl
      playurl(smid).then(res => {
        // console.log(res.req_0.data.midurlinfo)
        // 缓存以下 info
        const info = res.req_0.data.midurlinfo
        // 遍历 info , 拿到每一个 purl, 把 purl 合并到 song 对象中
        for (let i = 0; i < info.length; i++) {
          const s = new Song(list[i].musicData)
          let { purl } = info[i]
          if (purl) {
            purl = `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/${purl}`
          }
          s.purl = purl;
          ret.push(s)
        }
      })
      return ret;
    }
  },
  created() {
    this._getSongList()
  }
}
</script>

<style scoped lang="stylus">
@import '~@assets/stylus/variable'
.singer-detail
  position fixed
  z-index 100
  top 0
  left 0
  right 0
  bottom 0
  background $color-background
</style>