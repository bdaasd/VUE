<template>
  <div>
    <MHeader />
    <MTab />
    <!-- 四大路由渲染出口 -->
    <router-view />
    <!-- 播放组件 -->
    <m-player />
  </div>
</template>
<script>
import MHeader from '@base/m-header'
import MTab from '@base/m-tab'
import MPlayer from '@components/m-player'

export default {
  components: {
    MHeader,
    MTab,
    MPlayer
  }
}

</script>
