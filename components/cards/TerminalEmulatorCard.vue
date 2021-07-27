<template>
  <v-card>
    <v-card-title>
      <v-icon>mdi-console</v-icon>
      Terminal
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text id="termlines">
      <v-list dense class="scrollable-list">
        <v-list-item v-for="(line, index) in messages" :key="'termresp' + index" class="mt-0 mb-0 pt-0 pb-0 term-item-line">
          <v-list-item-content class="term-line mt-0 mb-0 pt-0 pb-0">
            <span class="term-item-line-prompt">{{pwd}} $</span><span>{{line}}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-divider v-if="enableInput" class="ma-0 pa-0"></v-divider>
    <v-card-actions v-if="enableInput">
      <v-text-field v-model="inputField" class="text-inconsolata" hide-details="auto" autofocus full-width solo :prefix="pwd + ' '+ inputPrefix" @keydown="handleInputKeyPress"></v-text-field>
    </v-card-actions>
  </v-card>
</template>
<script>
import consola from 'consola'
import { TERM_SEND_COMMAND, TERM_STDERR, TERM_STDOUT } from "~/assets/pwnsocket/messages";
export default {
  props: {
    enableInput: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      inputField:'',
    }
  },
  computed: {
    inputPrefix() {
      return '$'
    },
    pwd() {
      return this.$store.getters['terminal/pwd']
    },
    messages() {
      return this.$store.getters['terminal/messages']
    }
  },
  mounted() {
    this.handleResponses()
  },
  methods: {
    handleResponses() {
      this.$socket.on(TERM_STDOUT, (data) => {
        consola.info('Received from STDOUT: %s', JSON.stringify(data))
        this.termout(data)
        const container = this.$el.querySelector("#termlines");
        container.scrollTop = container.scrollHeight;
      })
      this.$socket.on(TERM_STDERR, (data) => {
        consola.info('Received from STDERR: %s', JSON.stringify(data))
        this.termout(data)
      })
    },
    termout(line) {
      this.$store.dispatch('terminal/termout', line)
    },
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
      if(command === 'clear') {
        this.$store.dispatch('terminal/clear')
      } else
      if(this.$store.getters['ws/connected']) {
        this.$socket.emit(TERM_SEND_COMMAND, {
          command
        })
      }
    }
  }
}
</script>
<style>
.v-list .scrollable-list{
  height: 400px;
  max-height: 400px;/* or any height you want */
  overflow-y:auto;
}
.v-card__text {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 400px;
}
.v-text-field__prefix {
  font-weight: bold;
  color: forestgreen;
}
.v-list-item .term-item-line {
  font-family: "Inconsolata", sans-serif;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.term-item-line-prompt{
  font-weight: bold;
  color: forestgreen;
}

.v-list-item__content .term-line {
  font-family: "Inconsolata", sans-serif;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.v-text-field__slot {
  font-family: "Inconsolata", sans-serif;
}
</style>
