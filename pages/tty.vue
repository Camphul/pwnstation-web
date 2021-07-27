<template>
  <v-row>
    <v-col cols="12">
      <TerminalEmulatorCard></TerminalEmulatorCard>
    </v-col>
  </v-row>
</template>
<script>
import TerminalEmulatorCard from "~/components/cards/TerminalEmulatorCard";
export default {
  components: {
    TerminalEmulatorCard
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$pageTitle('Terminal Emulator')
  }
}
</script>
