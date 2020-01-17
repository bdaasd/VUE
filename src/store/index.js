import Vue from 'vue';
import Vuex from 'vuex';
import singerModule from './singerModule'
import player from './player'
import hotRecom from './hotRecom'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // 把状态按照四大组件来划分
    singerModule,
    player,
    hotRecom
  },
});
