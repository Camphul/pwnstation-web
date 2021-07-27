import consola from 'consola'
export const state = () => ({
  list: [],
  defaultSnackbar: {
    message: 'test msg',
    bottom: true,
    center: true,
    color: "primary",
    transition: "scale-transition",
    timeout:  10000,
  }
})

export const mutations = {
  add(state, data) {
    const notificationData = Object.assign(state.defaultSnackbar, data)
    consola.info('Adding notification: ' + JSON.stringify(notificationData))
    state.list.push(notificationData)
    if(state.list.length >= 5) {
      state.list.splice(0, 1)
    }
  },
  cleanup(state, val) {
    state.list.splice(state.list.indexOf(val), 1)
  },
}

export const actions = {
  add({commit}, data) {
    return commit('add', data)
  },
  cleanup({commit}, val) {
    return commit('cleanup', val);
  }
}

export const getters = {
  notifications(state) {
    return state.list
  }
}
