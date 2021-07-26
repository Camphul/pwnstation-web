export const state = () => ({
  drawer: false,
  title: 'PwnStation',
  loadingOverlay: false,
  drawerItems: [
    {
      icon: 'mdi-apps',
      title: 'Home',
      to: '/'
    },
    {
      icon: 'mdi-lan',
      title: 'Net Interfaces',
      to: '/netInterfaces'
    },
    {
      icon: 'mdi-wifi-cog',
      title: 'Host AP',
      to: '/hostAp'
    },
    {
      icon: 'mdi-antenna',
      title: 'Kismet',
      to: '/kismet'
    },
    {
      icon: 'mdi-sitemap',
      title: 'System Services',
      to: '/systemServices'
    },
    {
      icon: 'mdi-console',
      title: 'Terminal',
      to: '/tty'
    },
    {
      icon: 'mdi-battery-charging-outline',
      title: 'UPS Hat',
      to: '/ups'
    },
    {
      icon: 'mdi-database-cog',
      title: 'PwnPanel Settings',
      to: '/panelConfig'
    },

  ],
})

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  setLoadingOverlay(state, loading) {
    state.loadingOverlay = loading;
  },
  setTitle(state, title) {
    state.title = title
  }
}

export const actions = {
  toggleDrawer({commit}) {
    return commit('toggleDrawer')
  },
  setTitle({commit}, title) {
    return commit('setTitle', title)
  },
  setLoadingOverlay({commit}, loading) {
    commit('setLoadingOverlay', loading)
  }
}

export const getters = {
  drawer(state) {
    return state.drawer
  },
  showLoadingOverlay(state) {
    return state.loadingOverlay
  },
  title(state) {
    return state.title
  },
  drawerItems(state) {
    return state.drawerItems;
  }
}
