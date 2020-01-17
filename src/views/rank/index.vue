<template>
  <div class="rank" ref="rank">
    <m-scroll class="toplist" ref="toplist" :data="ranklist">
      <ul>
        <li class="item" v-for="(items,index) in ranklist" @click="selectItem(items)" :key="index">
          <ol class="songlist">
            <li class="song" v-for="(item, index) in items.songList" :key="index">
              <span>{{index+1}}. {{ item.songname }}</span>
              <span class="name">{{ item.singername }}</span>
            </li>
          </ol>
          <div class="icon">
            <img width="120" height="120" :src="items.picUrl" />
          </div>
        </li>
      </ul>
      <!-- loading -->
      <div class="loading-container" v-show="!ranklist.length">
        <m-loading />
      </div>
    </m-scroll>
    <!-- rank 二级页 -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import getRanklist from '@api/rankApi';
import { mapMutations } from 'vuex';
import MScroll from '@components/m-scroll'
import MLoading from '@base/loading'

export default {
  components: {
    MScroll,
    MLoading
  },
  data() {
    return {
      ranklist: []
    };
  },
  methods: {
    ...mapMutations('rank', ['setRankSong']),
    _getRanklist() {
      getRanklist().then(res => {
        this.ranklist = res.data.topList;
      });
    }
  },
  // 点击排行列表
  selectItem(item) {
    this.setRankSong(item);
    this.$router.push({
      path: `/rank/${item.id}`
    });
  },
  handlePlaylist(playlist) {
    const bottom = playlist.length > 0 ? '60px' : '';
    this.$refs.rank.$el.style.bottom = bottom;
    this.$refs.toplist.refresh();
  },
  created() {
    this._getRanklist()
  }
}
</script>

<style scoped lang="stylus">
@import '~@assets/stylus/variable';
@import '~@assets/stylus/mixin';

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .toplist {
    height: 100%;
    overflow: hidden;

    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 10px;

      &:last-child {
        padding-bottom: 20px;
      }

      .icon {
        flex: 0 0 100px;
        width: 120px;

        img {
          border-radius: 0 8px 8px 0;
        }
      }

      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 120px;
        overflow: hidden;
        background: rgba(154, 217, 136, 0.3);
        color: $color-text-d;
        font-size: $font-size-medium-x;
        border-radius: 8px 0 0 8px;

        .song {
          no-wrap();
          line-height: 26px;

          .name {
            color: #888;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
  }

  .slide-enter, .slide-leave-to {
    transform: translateX(100%);
  }
}
</style>