const state = {
    rankSong: []
  }
  
  const getters = {
    rankSong(state) {
      return state.rankSong
    }
  }
  
  const mutations = {
    setRankSong(state, list) {
      state.rankSong = list
    }
  }
  
  export default {
    state,
    getters,
    mutations,
    namespaced: true
  }