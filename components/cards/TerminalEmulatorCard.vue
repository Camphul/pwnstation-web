<template>
  <v-card>
    <v-card-title>
      <v-icon>mdi-console</v-icon>
      Terminal
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      TTY output
    </v-card-text>
    <v-divider v-if="enableInput" class="ma-0 pa-0"></v-divider>
    <v-card-actions v-if="enableInput">
      <v-text-field v-model="inputField" class="text-inconsolata" hide-details="auto" autofocus full-width solo :prefix="inputPrefix" @keydown="handleInputKeyPress"></v-text-field>
    </v-card-actions>
  </v-card>
</template>
<script>
import consola from 'consola'
export default {
  props: {
    enableInput: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      inputField:''
    }
  },
  computed: {
    inputPrefix() {
      return 'pi@pwn.station $'
    }
  },
  methods: {
    resetInput() {
      this.inputField = ''
    },
    handleInputKeyPress(keyEvent) {
      if(keyEvent.key !== 'Enter') {
        return;
      }
      const command = (' ' + this.inputField).slice(1);
      this.resetInput()
      consola.info('Sending command:%s', command)
      this.sendCommand(command)
    },
    sendCommand(command) {
      if(this.$store.getters['ws/connected']) {
        consola.info('soket emit in here')
      }
    }
  }
}
</script>
<style>
.v-text-field__prefix {
  font-weight: bold;
  color: forestgreen;
}
.v-text-field__slot {
  font-family: "Inconsolata", sans-serif;
  font-size: larger;
}
</style>
