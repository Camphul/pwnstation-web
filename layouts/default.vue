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
    <LoadingOverlay></LoadingOverlay>
  </v-app>
</template>

<script>
import PwnFooter from "~/components/layout/PwnFooter"
import PwnAppBar from '~/components/layout/PwnAppBar'
import PwnNavigationDrawer from '~/components/layout/PwnNavigationDrawer'
import LoadingOverlay from "~/components/overlays/LoadingOverlay";
export default {
  components: {
    PwnFooter,
    PwnAppBar,
    PwnNavigationDrawer,
    LoadingOverlay
  },
  created() {
    this.$store.dispatch('ui/setLoadingOverlay', true)
  },
  mounted() {
    this.$store.dispatch('ui/setLoadingOverlay',false);
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
