<template>
  <client-only>
    <v-snackbars :objects.sync="objects">
      <template v-slot:default="{ message}">
        {{message}}
      </template>
      <template v-slot:action="{ close }">
        <v-btn text @click="close">Close</v-btn>
      </template>
    </v-snackbars>
  </client-only>
</template>
<script>
export default {
  computed: {
    objects: {
      get() {
        return this.$store.getters['notifications/notifications']
      },
      set(val) {
        this.$store.dispatch('notifications/cleanup', val)
      }
    }
  }
}
</script>
