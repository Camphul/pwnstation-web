<template>
  <v-app-bar
    clipped-left
    app
    elevation="5"
  >
    <v-app-bar-nav-icon @click.stop="toggleDrawer()" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <AppBarRightDropDown></AppBarRightDropDown>
  </v-app-bar>
</template>
<script>
import AppBarRightDropDown from '~/components/layout/AppBarRightDropDown'

export default {
  components: {
    AppBarRightDropDown,
  },
  computed: {
    title() {
      return this.$store.getters['ui/title']
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.dispatch('ui/toggleDrawer')
    }
  }
}
</script>
