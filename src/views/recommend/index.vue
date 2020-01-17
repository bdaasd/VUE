<template>
  <div class="recommend">
    <div class="recommend-content">
      <!-- 轮播图 -->
      <div class="slider-wrapper">
        <m-slider :sliderlist="sliderData" />
      </div>
      <!-- 热门歌曲列表 -->
      <div class="recommend-list">
        <h1 class="list-title">热门歌曲推荐</h1>
        <m-scroll class="recommend-content" :data="HotRecommend">
          <ul>
            <li
              class="item"
              v-for="(item, idx) in HotRecommend"
              :key="idx"
              @click="selectSong(item)"
            >
              <div class="icon">
                <img width="160" height="160" :src="item.imgurl" />
              </div>
              <div class="text">
                <p class="desc">{{ item.dissname }}</p>
                <h2 class="name">{{ item.creator.name}}</h2>
              </div>
            </li>
          </ul>
        </m-scroll>
      </div>
    </div>
    <div class="loading-container" v-if="!HotRecommend.length">
      <m-loading />
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getSliderList, getHotRecommend } from '@api/recommendApi';
import { CODE_OK } from '@assets/js/paramconfig';
import MSlider from '@components/m-slider';
import { mapMutations } from 'vuex';
import MScroll from '@components/m-scroll';
import MLoading from '@base/loading/loading';

export default {
  components: {
    MScroll,
    MSlider,
    MLoading
  },
  data() {
    return {
      // 维护一个轮播数据
      sliderData: [],
      HotRecommend: []
    };
  },
  methods: {
    ...mapMutations('hotRecom', ['setHotRecom']),
    _getSliderList() {
      // 获取轮播图数据
      getSliderList().then(res => {
        // 判断 code 语义化
        if (res.code === CODE_OK) {
          this.sliderData = res.data.slider;
        }
      });
    },
    _getHotRecommend() {
      // 获取热门歌曲数据
      getHotRecommend().then(res => {
        if (res.code === CODE_OK) {
          this.HotRecommend = res.data.list;
        }
      });
    },
    selectSong(item) {
      this.setHotRecom(item);
      this.$router.push({
        path: `/recommend/${item.dissid}`
      });
    }
  },
  created() {
    // created钩子做异步请求
    // 在钩子函数中一般不要写大量的逻辑代码
    this._getSliderList();
    this._getHotRecommend();
  }
};
</script>

<style scoped lang="stylus" >
@import '~@assets/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      height: 100%;
      overflow: hidden;
      position: relative;

      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium-x;
        color: $color-theme;
      }

      .item {
        display: inline-flex;
        box-sizing: border-box;
        align-items: center;
        flex-direction: column;
        width: 50%;

        .p-left {
          padding-left: 10px;
        }

        .p-right {
          padding-right: 10px;
        }

        .icon {
          flex: 0 0 60px;
          max-width: 160px;

          .recom-img {
            border-radius: 10px;
            max-width: 160px;
          }
        }

        .text {
          line-height: 20px;
          font-size: $font-size-medium;
          max-width: 160px;
          margin-top: 6px;

          .name {
            margin-bottom: 10px;
            color: #888;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateY(100%);
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