import consola from 'consola'
const MAX_HISTORY = 1000
export const state = () => ({
  messages: [],
  pwd: '',
})

export const mutations = {
  termout(state, data) {
    const cloned = JSON.parse(JSON.stringify(data))
    const line = cloned.line
    state.pwd = cloned.pwd
    consola.info('Adding term line: %s and current directory is %s', line, cloned.pwd)
    state.messages.push(line)
    if(state.messages.length >= MAX_HISTORY) {
      state.messages.splice(0, 1)
    }
  },
  clear(state) {
    state.messages = []
  }
}

export const actions = {
  termout({commit}, data) {
    return commit('termout', data)
  },
  clear({commit}) {
    return commit('clear')
  }
}

export const getters = {
  messages(state) {
    return state.messages
  },
  pwd(state) {
    return state.pwd
  }
}
