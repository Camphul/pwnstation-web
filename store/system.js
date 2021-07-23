export const state = () => ({
  list: []
})

export const mutations = {
  addStats(state, stats) {
    state.list.push(stats)
    if(state.list.length >= 20) {
      state.list.splice(0, 1)
    }
  },
  removeStats(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
}

export const actions = {
  addStats({commit}, stats) {
    return commit('addStats', stats)
  }
}

export const getters = {
  lastStat(state) {
    if(state.list.length <= 0) {
      return {
        ok: false,
        status: {},
      }
    } else {
      return state.list[state.list.length-1]
    }
  }
}
