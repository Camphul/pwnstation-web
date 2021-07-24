<template>
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
</template>
<script>
export default {
  computed: {
    items() {
      return this.$store.getters['ui/drawerItems']
    },
    drawer() {
      return this.$store.getters['ui/drawer']
    }
  },
}
</script>
