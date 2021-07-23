<template>
  <v-row>
    <v-col cols="12" sm="8" md="6">
      <v-btn>Safe shutdown</v-btn>
      <v-switch v-model="monitorMode" label="Monitor Mode"></v-switch>
      <v-switch v-model="kismetRunning" label="Kismet" :disabled="monitorMode === false"></v-switch>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      monitorMode: false,
      kismetRunning: false,
    }
  }
}
</script>
