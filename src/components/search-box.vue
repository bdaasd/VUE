<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" class="box" v-model="query" placeholder="请输入内容..."/>
    <!-- x  -->
    <i class="icon-dismiss" @click='dismiss' v-show='query'></i>
  </div>
</template>

<script >
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    dismiss() {
      this.query = ''
    },
    // query 改变方法
    changeQuery(query) {
      this.query = query
    }
  },
}
</script>


<style scoped lang="stylus">
@import '~@assets/stylus/variable'
.search-box
  display flex
  align-items center
  box-sizing border-box
  width 100%
  padding 0 6px
  height 40px
  background #f3f3f3
  border-radius 20px
  .icon-search
    font-size 24px
    color $color-background
  input::-webkit-input-placeholder
    color #999
  input:-moz-placeholder
    color #999
  input:-ms-input-placeholder
    color #999
  .box
    flex 1
    margin 0 5px
    line-height 30px
    background #f3f3f3
    color $color-text
    font-size $font-size-medium
    &::placeholder
      color $color-text-d
  .icon-dismiss
    font-size 16px
    color $color-dialog-background
</style>