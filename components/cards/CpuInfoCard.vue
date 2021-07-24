<template>
  <v-card :disabled="!hostStats.ok" :loading="!hostStats.ok">
    <v-card-title>CPU Information</v-card-title>
    <v-divider class="ma-0 pa-0"></v-divider>
    <v-list v-if="hostStats.ok" class="transparent">
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cpu-64-bit</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Number of cores</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{hostStats.status.cpu.cores}}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-speedometer</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Clock Frequency</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{hostStats.status.cpu.speed}}Ghz
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-thermometer</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Temperature</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{hostStats.status.cpuTemps.main}}° Celcius
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-card-text v-else>
      No stats known yet.
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  computed: {
    hostStats() {
      return this.$store.getters['system/lastStat']
    }
  }
}
</script>
