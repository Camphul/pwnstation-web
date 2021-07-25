<template>
  <v-row>
    <v-col cols="12" sm="6" md="6" class="pa-3 d-flex flex-column">
      <CpuInfoCard></CpuInfoCard>
    </v-col>
    <v-col cols="12" sm="6" md="6" class="pa-3 d-flex flex-column">
      <RamInfoCard></RamInfoCard>
    </v-col>
  </v-row>
</template>
<script>
import consola from 'consola'
import { HOST_STATS_UPDATE } from "~/assets/pwnsocket/messages";
import CpuInfoCard from "~/components/cards/CpuInfoCard";
import RamInfoCard from "~/components/cards/RamInfoCard";
export default {
  components: {
    CpuInfoCard,
    RamInfoCard
  },
  mounted() {
    this.$pageTitle('PwnStation')
    /* Listen for events: */
    this.$socket.on(HOST_STATS_UPDATE, (msg) => {
      consola.debug("Received new host system status")
      this.$store.dispatch('system/addStats', msg)
    })
  },
}
</script>
