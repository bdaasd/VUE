<template>
  <div class="search">
    <!-- search-box -->
    <div class="search-box-wrapper">
      <search-box  ref='searchBox' />
    </div>
    <!-- hotkey  -->
    <div class="shortcut-wrapper">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              class="item"
              v-for='item in hotkey'
              :key='item.n'
              @click='selectKey(item)'
            >
              <span>{{ item.k }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- suggest -->
    <!-- <div class="search-result" >
    </div> -->
  </div>
</template>

<script>
import SearchBox from '@components/search-box'
import getHotKey from '@api/searchApi'

export default {
  data() {
    return {
      hotkey: []
    }
  },
  components: {
    SearchBox
  },
  methods: {
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === 0) {
          this.hotkey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    selectKey(item) {
      // 获取组件 searchBox ,调用 changeQuery方法
      this.$refs.searchBox.changeQuery(item.k)
    }
  },
  created() {
    this._getHotKey()
  }
}
</script>

<style lang="stylus" >
@import '~@assets/stylus/variable'
@import '~@assets/stylus/mixin'
.search
  .search-box-wrapper
    margin 20px
  .shortcut-wrapper
    position fixed
    top 178px
    bottom 0
    width 100%
    .shortcut
      height 100%
      overflow hidden
      .hot-key
        margin 0 20px 20px 20px
        .title
          margin-bottom 20px
          font-size $font-size-medium-x
          color $color-text-l
          font-weight 900
        .item
          display inline-block
          padding 5px 8px
          margin 0 20px 10px 0
          border-radius 18px
          background $color-text-ll
          font-size $font-size-medium
          color $color-text-d
          border 1px solid #999
      .search-history
        position relative
        margin 0 20px
        .title
          display flex
          align-items center
          height 40px
          font-size $font-size-medium
          color $color-text-l
          .text
            flex 1
          .clear
            extend-click()
            .icon-clear
              font-size $font-size-medium
              color $color-text-d
  .search-result
    position fixed
    width 100%
    top 178px
    bottom 0
</style>