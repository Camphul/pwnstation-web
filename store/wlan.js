export const state = () => ({
  interfaces: [],
  loading: false,
})

export const mutations = {
  setInterfaces(state, ifaces) {
    state.interfaces = ifaces
  },
  setLoading(state, loading) {
    state.loading = loading;
  }
}

export const actions = {
  setInterfaces({ commit} , ifaces) {
    return commit('setInterfaces', ifaces)
  },
  setLoading({commit}, loading) {
    return commit('setLoading', loading)
  }
}
export const getters = {
  interfaces(state) {
    return state.interfaces
  },
  isLoading(state) {
    return state.loading;
  }
}
