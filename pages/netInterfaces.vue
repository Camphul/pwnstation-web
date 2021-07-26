<template>
  <v-row>
    <v-col v-if="wlanInterfaces.length === 0 && !isLoaded" cols="12" class="pa-3 d-flex flex-column">
      <v-overlay
        absolute
        :value="wlanInterfaces.length === 0 || (wlanInterfaces.length === 0 && isLoaded)"
      >
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-col>
    <v-col v-for="wlan in wlanInterfaces" v-else :key="netInterfaces.ifaceName" cols="12" sm="6" md="6" class="pa-3 d-flex flex-column">
      <v-card class="elevation-5 flex d-flex flex-column" :disabled="isLoaded" :loading="isLoaded">
        <v-card-title>{{ netInterfaces.ifaceName }}</v-card-title>
        <v-list v-if="!isLoading" class="pa-3 d-flex flex-column">
          <v-list-item>
            <v-list-item-title>Interface</v-list-item-title>
            <v-list-item-subtitle>{{ netInterfaces.iface }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Operational</v-list-item-title>
            <v-list-item-subtitle>{{ netInterfaces.operstate }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Wired/wireless</v-list-item-title>
            <v-list-item-subtitle>{{ netInterfaces.type }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item v-show="netInterfaces.ip4">
            <v-list-item-title>IPv4</v-list-item-title>
            <v-list-item-subtitle>{{ netInterfaces.ip4 }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>MAC</v-list-item-title>
            <v-list-item-subtitle>{{ netInterfaces.mac }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Internal interface</v-list-item-title>
            <v-list-item-subtitle>{{ netInterfaces.internal ? 'yes' : 'no' }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Virtual interface</v-list-item-title>
            <v-list-item-subtitle>{{ netInterfaces.virtual ? 'yes' : 'no' }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import consola from "consola";
import { WLAN_GET_INTERFACES, WLAN_RECEIVE_INTERFACES } from "~/assets/pwnsocket/messages";

export default {
  data() {
    return {
      wlanUpdateInterval: 60000,
    }
  },
  computed: {
    wlanInterfaces() {
      return this.$store.getters['wlan/interfaces']
    },
    isLoaded() {
      return this.$store.getters['wlan/isLoading']
    }
  },
  mounted() {
    this.$pageTitle('Network Interfaces')
    // to prevent invalid states
    // now setup wlan interval
    this.updateWlanInterfaces();

    this.wlanUpdateInterval = setInterval(this.updateWlanInterfaces, this.wlanUpdateInterval)
  },
  beforeDestroy() {
    clearInterval(this.wlanUpdateInterval);
    // to prevent invalid states
  },
  methods: {
    updateWlanInterfaces() {
      if(this.$store.getters['ws/connected']) {
        const timeoutRef = setTimeout(() => {
          if(this.$store.getters['wlan/isLoading']) {
            consola.info('WLAN TIMEOUT REACHED')
            this.$store.dispatch('wlan/setLoading', false)
          }
        }, 10000)
        this.$store.dispatch('wlan/setLoading', true).then(() => {
          this.$socket.on(WLAN_RECEIVE_INTERFACES, (interfaces) => {
            this.$store.dispatch('wlan/setInterfaces', interfaces).then(() => {
              clearTimeout(timeoutRef)
              this.$store.dispatch('wlan/setLoading', false)
            })
          })
        });
        this.$socket.emit(WLAN_GET_INTERFACES);
      }
    }
  }
}
</script>
