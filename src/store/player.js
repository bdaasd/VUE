import { mode } from '../assets/js/paramconfig'

const state = {
  playing: false,
  fullScreen: true,
  playlist: [],
  orderlist: [],
  pmode: mode.order, // 0 1 2
  currentIdx: -1,
  purl: ''
}

const getters = {
  playing(state) {
    return state.playing
  },
  fullScreen(state) {
    return state.fullScreen
  },
  playlist(state) {
    return state.playlist
  },
  orderlist(state) {
    return state.orderlist
  },
  pmode(state) {
    return state.pmode
  },
  purl(state) {
    return state.purl
  },
  currentIdx(state) {
    return state.currentIdx
  },
  // 当前播放歌曲 = 播放列表[播放下标]
  currentSong(state) {
    return state.playlist[state.currentIdx]
  }
}

const mutations = {
  setPlaying(state, bool) {
    state.playing = bool
  },
  setFullScreen(state, bool) {
    state.fullScreen = bool
  },
  setPlaylist(state, list) {
    state.playlist = list
  },
  setOrderlist(state, list) {
    state.orderlist = list
  },
  setPmode(state, mode) {
    state.pmode = mode
  },
  setCurrentIdx(state, idx) {
    state.currentIdx = idx
  }
}

const actions = {
  // 改变状态有 playing | playlist | ordelist | currentIdx
  // 封装一个 selectPlay
  selectPlay({ commit }, { list, idx }) {
    commit('setPlaying', true)
    commit('setPlaylist', list)
    commit('setOrderlist', list)
    commit('setCurrentIdx', idx)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}