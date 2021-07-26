<template>
  <v-card v-if="wlan != undefined" class="elevation-5 flex d-flex flex-column" :disabled="isLoaded" :loading="isLoaded">
    <v-card-title>
      <v-icon v-if="wlan.type == 'wireless'">mdi-wifi</v-icon>
      <v-icon v-else-if="wlan.ifaceName === 'lo' || wlan.operstate == 'unknown'">mdi-restore</v-icon>
      <v-icon v-else>mdi-ethernet</v-icon>
      <span class="ml-2"> {{wlan.ifaceName }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-overlay
      absolute="absolute"
      opacity="1"
      :value="isLoaded"
    >
    </v-overlay>
    <v-list :disabled="isLoaded" class="pa-3 d-flex flex-column">
      <v-list-item>
        <v-list-item-title>Interface</v-list-item-title>
        <v-list-item-subtitle>{{ wlan.iface }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item v-if="wlan.operstate !== 'unknown'">
        <v-list-item-title>Operational</v-list-item-title>
        <v-list-item-subtitle>
          <v-switch class="v-input--switch" :input-value="wlan.operstate == 'up'" @mousedown="handleOperstateChange" ></v-switch>
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Wired/wireless</v-list-item-title>
        <v-list-item-subtitle>{{ wlan.type }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item v-show="wlan.ip4">
        <v-list-item-title>IPv4</v-list-item-title>
        <v-list-item-subtitle>{{ wlan.ip4 }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>MAC</v-list-item-title>
        <v-list-item-subtitle>{{ wlan.mac }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Internal interface</v-list-item-title>
        <v-list-item-subtitle>{{ wlan.internal ? 'yes' : 'no' }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Virtual interface</v-list-item-title>
        <v-list-item-subtitle>{{ wlan.virtual ? 'yes' : 'no' }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <ConfirmationDialog ref="confirmOpState"></ConfirmationDialog>
  </v-card>
</template>
<script>
  import { WLAN_SET_OPERSTATE } from "~/assets/pwnsocket/messages";
  import ConfirmationDialog from "~/components/dialogs/ConfirmationDialog";

  export default {
    props: ['wlan', 'isLoaded'],
    components: {
      ConfirmationDialog
    },
    methods: {
      async handleOperstateChange(event) {
        event.stopPropagation();
        event.preventDefault()
        event.stopImmediatePropagation()
        if (await this.$refs.confirmOpState.open(
            "Confirm",
            "Changing operational status might affect your connection",
            {
              color: 'primary'
            }
          )
        ) {
          let newState;
          if (this.wlan.operstate === 'down') {
            newState = true;
          } else {
            newState = false;
          }
          this.$socket.emit(WLAN_SET_OPERSTATE, {
            iface: this.wlan.ifaceName,
            opStatus: newState
          })
        }
      }
    }
  }
</script>
<style>
.v-input--switch {
  display: inline-block;
}
</style>

