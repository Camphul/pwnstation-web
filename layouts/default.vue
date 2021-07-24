<template>
  <v-app dark>
    <PwnNavigationDrawer></PwnNavigationDrawer>
    <PwnAppBar></PwnAppBar>
    <v-main>
      <v-container dark>
        <Nuxt />
      </v-container>
    </v-main>
    <PwnFooter></PwnFooter>
  </v-app>
</template>

<script>
import PwnFooter from "~/components/layout/PwnFooter"
import PwnAppBar from '~/components/layout/PwnAppBar'
import PwnNavigationDrawer from '~/components/layout/PwnNavigationDrawer'
export default {
  components: {
    PwnFooter,
    PwnAppBar,
    PwnNavigationDrawer
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
