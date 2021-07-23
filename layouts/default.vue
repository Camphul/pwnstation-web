<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
      :style="{
      top: $vuetify.application.top + 'px',
      zIndex: 4,
    }"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      app
      absolute
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <AppBarRightDropDown></AppBarRightDropDown>
    </v-app-bar>
    <v-main>
      <v-container dark>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; Luca Camphuisen {{ new Date().getFullYear() }} </span>
    </v-footer>
  </v-app>
</template>

<script>
import AppBarRightDropDown from "~/components/AppBarRightDropDown";
export default {
  components: {
    AppBarRightDropDown,
  },
  data () {
    return {
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-wifi',
          title: 'Wifi',
          to: '/wifi'
        },
        {
          icon: 'mdi-console',
          title: 'Terminal',
          to: '/tty'
        },

      ],
      title: 'PwnStation'
    }
  }
}
</script>
