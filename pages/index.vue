<template>
  <v-row>
    <v-col cols="12" sm="6" md="6">
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
    </v-col>
    <v-col cols="12" sm="6" md="6">
      <v-card :disabled="!hostStats.ok" :loading="!hostStats.ok">
        <v-card-title>RAM Information</v-card-title>
        <v-divider class="ma-0 pa-0"></v-divider>
        <v-list v-if="hostStats.ok" class="transparent">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-chart-box-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Total System RAM</v-list-item-title>
            <v-list-item-subtitle class="text-right">
              {{hostStats.status.ram.total | toGigaBytes }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-title>System RAM Used</v-list-item-title>
            <v-list-item-subtitle class="text-right">
              {{hostStats.status.ram.used|toGigaBytes}}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-chart-box-plus-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>System Ram Available</v-list-item-title>
            <v-list-item-subtitle class="text-right">
              {{hostStats.status.ram.available|toGigaBytes}}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
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
    </v-col>
  </v-row>
</template>
<script>
import consola from 'consola'
import { HOST_STATS_UPDATE } from "~/assets/pwnsocket/messages";
export default {
  data() {
    return {
      testMsg: 'msg not yet set.'
    }
  },
  filters: {
    toGigaBytes(value) {
      const gbs = value/1000000000
      return gbs.toFixed(2) + "GB";
    }
  },
  mounted() {
    /* Listen for events: */
    this.$socket.on('connect', ()=> {
      this.$socket.on(HOST_STATS_UPDATE, (msg) => {
        consola.debug("Received new host system status")
        this.$store.dispatch('system/addStats', msg)
      })
    });
  },
  methods: {
  },
  computed: {
    hostStats() {
      return this.$store.getters['system/lastStat']
    }
  }
}
</script>
