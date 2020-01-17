import Vue from 'vue';
import Fastclick from 'fastclick';
import App from './App';
import router from './router';
import store from './store';
import '@assets/stylus/index'
import './plugins/vant.js'
// 引入主样式文件

// 整个 body 点击节点都没有延时
Fastclick.attach(document.body);
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
