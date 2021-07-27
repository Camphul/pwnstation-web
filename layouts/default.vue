<template>
  <v-app dark>
    <PwnNavigationDrawer></PwnNavigationDrawer>
    <PwnAppBar></PwnAppBar>
    <v-main>
      <v-container dark>
        <Nuxt />
      </v-container>
    </v-main>
    <Notifications></Notifications>
    <PwnFooter></PwnFooter>
    <LoadingOverlay></LoadingOverlay>
  </v-app>
</template>

<script>
import PwnFooter from "~/components/layout/PwnFooter"
import Notifications from "~/components/Notifications";
import PwnAppBar from '~/components/layout/PwnAppBar'
import PwnNavigationDrawer from '~/components/layout/PwnNavigationDrawer'
import LoadingOverlay from "~/components/overlays/LoadingOverlay";
export default {
  components: {
    PwnFooter,
    PwnAppBar,
    PwnNavigationDrawer,
    LoadingOverlay,
    Notifications,
  },
  created() {
    this.$store.dispatch('ui/setLoadingOverlay', true)
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
  },
  mounted() {
    this.$socket.on('connect', () => this.$store.dispatch('ui/setLoadingOverlay', false));
    this.$socket.on('disconnect', () => this.$store.dispatch('ui/setLoadingOverlay', true));
  }
}
</script>
