<template>
  <div class='singer'>
    <m-scroll class='listview' ref='listview'>
      <ul>
        <li class='list-group' v-for='(groups, idx) in singerlist' :key='idx' ref='listGroups'>
          <h2 class='list-group-title'>{{ groups.title }}</h2>
          <ul>
            <li class='list-group-item'
                v-for='(item, idx) in groups.items'
               :key='idx'
               @click='selectSinger(item)'
            >
              <img v-lazy="item.headImg" alt="" class='avatar'>
              <span class='name'>{{ item.sname }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <!-- 检索列表 -->
      <div class='list-shortcut'>
        <ul>
          <li v-for='(item, idx) in getCheckIndex' :key='idx' class='item' @click='scrollTo(idx)'>
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- loading -->
      <div class='loading-container'>
        <m-loading v-show='!singerlist.length' />
      </div>
    </m-scroll>
    <!-- 渲染出口  singerDetail -->
    <transition name='slide'>
      <router-view />
    </transition>
  </div>
</template>

<script>
import { getSingerList } from '@api/singerApi'
import { CODE_OK } from '@assets/js/paramconfig'
import MScroll from '@components/m-scroll'
import { mapMutations } from 'vuex'
import MLoading from '@base/loading'

export default {
  components: {
    MScroll,
    MLoading
  },
  data() {
    return {
      singerlist: []
    }
  },
  computed: {
    getCheckIndex() {
      return this.singerlist.map(item => item.title.slice(0, 1))
    }
  },
  methods: {
    ...mapMutations('singerModule', ['setSingerInfo']),
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === CODE_OK) {
          this.singerlist = this.handleSingerlist(res.data.list)
        }
      })
    },
    handleSingerlist(list) {
      // 处理歌手列表
      const map = {
        hot: {
          title: '热门',
          items: []
        }
      }
      // 取前十条热门数据
      list.forEach((obj, idx) => {
        if (idx < 10) {
          map.hot.items.push({
            mid: obj.Fsinger_mid,
            sname: obj.Fsinger_name,
            headImg: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${obj.Fsinger_mid}.jpg?max_age=2592000`
          })
        }
        /* A ~ Z
          "A" : {
            title: 'A',
            items: [{},{},..]
          }
        */
        const key = obj.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          mid: obj.Fsinger_mid,
          sname: obj.Fsinger_name,
          headImg: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${obj.Fsinger_mid}.jpg?max_age=2592000`
        })
      })
      // map是一个无序的对象, 处理成有序的数组
      const hot = [] // 存放 hot
      const ret = [] // 存放 A ~ Z
      Object.keys(map).forEach(key => {
        const val = map[key]
        if (val.title === '热门') {
          hot.push(val)
        } else if (val.title.match(/[A-Z]/)) {
          ret.push(val)
        }
      })
      // 按照 A ~ Z 排序
      ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      return [...hot, ...ret]
    },
    scrollTo(idx) {
      const currentGroup = this.$refs.listGroups[idx];
      // 调用滚动组件上的scrollToElement()
      this.$refs.listview.scrollToElement(currentGroup, 300)
    },
    selectSinger(s) {
      this.setSingerInfo(s)
      // 导航到 sinegrDetail
      this.$router.push({
        path: `/singer/${s.mid}`
      })
    }
  },
  created() {
    this._getSingerList()
  }
}
</script>

<style scoped lang="stylus">
@import '~@assets/stylus/variable'
.singer
  position fixed
  top 88px
  bottom 0
  width 100%
  .slide-enter-active, .slide-leave-active
    transition all 0.5s
  .slide-enter, .slide-leave-to
    transform translateX(100%)
  .listview
    position relative
    width 100%
    height 100%
    overflow hidden
    background #fff
    .list-group
      padding-bottom 30px
      .list-group-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background #f2f2f2
      .list-group-item
        display flex
        align-items center
        padding 20px 0 0 30px
        .avatar
          width 70px
          height 70px
          border-radius 50%
        .name
          margin-left 20px
          color $color-text-l
          font-size $font-size-medium-x
    .list-shortcut
      position absolute
      z-index 30
      right 0
      top 50%
      transform translateY(-50%)
      width 20px
      padding 20px 0
      border-radius 10px
      text-align center
      background rgba(200, 200, 200, 0.1)
      font-family Helvetica
      .item
        padding 3px
        line-height 1
        color #333
        font-size $font-size-small
        &.current
          color $color-theme
    .list-fixed
      position absolute
      top 0
      left 0
      width 100%
      .fixed-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
    .loading-container
      display flex
      align-items center
      justify-content center
      transform translateY(100%)
</style>
