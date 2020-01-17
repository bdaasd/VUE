import Vue from 'vue';
import {
  Swipe, SwipeItem, Toast, Lazyload
} from 'vant';

Vue.use(Swipe).use(SwipeItem).use(Toast).use(Lazyload, {
  // eslint-disable-next-line global-require
  loading: require('@assets/images/qq2.png')
});
