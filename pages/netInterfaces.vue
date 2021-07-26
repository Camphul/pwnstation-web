<template>
  <v-row>
    <v-col v-for="winterface in wlanInterfaces" :key="winterface.ifaceName" cols="12" sm="4" md="4" class="pa-3 d-flex flex-column">
      <NetInterfaceCard :wlan="winterface" :is-loaded="isLoaded"></NetInterfaceCard>
    </v-col>
    <v-col v-if="wlanInterfaces.length === 0" cols="12" sm="4" md="4" class="pa-3 d-flex flex-column text-center">
      <v-overlay
        absolute="absolute"
        opacity="0.5"
        :value="wlanInterfaces.length === 0"
      >
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
        <p class="font-weight-bold">Loading Interfaces</p>
      </v-overlay>
    </v-col>
  </v-row>
</template>
<script>
import consola from "consola";
import { WLAN_GET_INTERFACES, WLAN_RECEIVE_INTERFACES } from "~/assets/pwnsocket/messages";
import NetInterfaceCard from "~/components/cards/NetInterfaceCard";

export default {
  components: {
    NetInterfaceCard,
  },
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
    this.$nextTick(() => {
      setTimeout(this.updateWlanInterfaces, 500)
    })
    this.wlanUpdateInterval = setInterval(this.updateWlanInterfaces, this.wlanUpdateInterval)
  },
  beforeDestroy() {
    clearInterval(this.wlanUpdateInterval);
  },
  methods: {
    updateWlanInterfaces() {
      if(this.$store.getters['ws/connected']) {
        const timeoutRef = setTimeout(() => {
          if(this.$store.getters['wlan/isLoading']) {
            consola.info('WLAN TIMEOUT REACHED')
            this.$store.dispatch('wlan/setLoading', false)
          }
        }, 30000)
        this.$store.dispatch('wlan/setLoading', true).then(() => {
          this.$socket.on(WLAN_RECEIVE_INTERFACES, (interfaces) => {
            this.$store.dispatch('wlan/setInterfaces', interfaces).then(() => {
              this.$store.dispatch('wlan/setLoading', false)
              clearTimeout(timeoutRef)
            })
          })
        });
        this.$socket.emit(WLAN_GET_INTERFACES);
      }
    }
  }
}
</script>
