export const state = () => ({
  drawer: false,
  title: 'PwnStation',
  drawerItems: [
    {
      icon: 'mdi-apps',
      title: 'Home',
      to: '/'
    },
    {
      icon: 'mdi-wifi',
      title: 'WLAN Interfaces',
      to: '/wlan'
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
      title: 'Process\' and Services',
      to: '/processAndServices'
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
  setTitle(state, title) {
    state.title = title
  }
}

export const actions = {
  toggleDrawer({commit}) {
    return commit('toggleDrawer')
  },
  setTitle({commit}, title) {
    commit('setTitle', title)
  }
}

export const getters = {
  drawer(state) {
    return state.drawer
  },
  title(state) {
    return state.title
  },
  drawerItems(state) {
    return state.drawerItems;
  }
}
