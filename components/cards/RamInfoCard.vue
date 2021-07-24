<template>
  <v-card :disabled="!hostStats.ok" :loading="!hostStats.ok" class="elevation-5 flex d-flex flex-column">
    <v-card-title>RAM Information</v-card-title>
    <v-divider class="ma-0 pa-0"></v-divider>
    <v-list v-if="hostStats.ok" class="transparent">
      <v-list-item>
        <v-list-item-icon class="d-none d-md-flex">
          <v-icon>mdi-chart-box-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Total System RAM</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{hostStats.status.ram.total | toGigaBytes }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon class="d-none d-md-flex">
          <v-icon>mdi-chart-line</v-icon>
        </v-list-item-icon>
        <v-list-item-title>System RAM Used</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{hostStats.status.ram.used|toGigaBytes}}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon class="d-none d-md-flex">
          <v-icon>mdi-chart-box-plus-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>System Ram Available</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{hostStats.status.ram.available|toGigaBytes}}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon class="d-none d-md-flex">
          <v-icon>mdi-chart-box-plus-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Process RAM Available</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{hostStats.status.ram.free|toGigaBytes}}
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
  filters: {
    toGigaBytes(value) {
      const gbs = value/1000000000
      return gbs.toFixed(2) + "GB";
    }
  },
  computed: {
    hostStats() {
      return this.$store.getters['system/lastStat']
    }
  },
}
</script>
