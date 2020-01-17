const state = {
  hotRecomlist: []
}

const getters = {
  hotRecomlist(state) {
    return state.hotRecomlist
  }
}

const mutations = {
  setHotRecom(state, list) {
    state.hotRecomlist = list
  }
}

export default {
  state,
  getters,
  mutations,
  namespaced: true
}