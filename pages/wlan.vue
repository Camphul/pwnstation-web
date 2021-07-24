<template>
  <v-row>
    <v-col cols="12" sm="8" md="6">
      <p>Displaying wlan interfaces here</p>
    </v-col>
  </v-row>
</template>
<script>
export default {
  mounted() {
    this.$pageTitle('WLAN Interfaces')
  }
}
</script>
