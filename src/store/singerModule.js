const state = {
  singerInfo: {}
}

const getters = {
  singerInfo(state) {
    return state.singerInfo
  }
}

const mutations = {
  setSingerInfo(state, info) {
    state.singerInfo = info
  }
}

export default {
  state,
  getters,
  mutations,
  namespaced: true
}