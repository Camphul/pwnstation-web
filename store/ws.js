export const state = () => ({
  connected: false
})

export const mutations = {
  setConnected(state, connected) {
    state.connected = connected
  }
}

export const actions = {
  setConnected({ commit} , connected) {
    return commit('setConnected', connected)
  }
}
export const getters = {
  connected(state) {
    return state.connected
  }
}
