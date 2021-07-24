<template>
  <div class="text-center">
    <v-overlay :value="showOverlay" opacity="1">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
export default {
  computed: {
    showOverlay() {
      return this.$store.getters['ui/showLoadingOverlay']
    }
  }
}
</script>
