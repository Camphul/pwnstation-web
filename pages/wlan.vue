<template>
  <v-row>
    <v-col cols="12" sm="8" md="6">
      <p>Displaying wlan interfaces here</p>
      <p>{{wlanInterfaces}}</p>
    </v-col>
  </v-row>
</template>
<script>
import { WLAN_GET_INTERFACES, WLAN_RECEIVE_INTERFACES } from "~/assets/pwnsocket/messages";

export default {
  data() {
    return {
      wlanInterfaces: []
    }
  },
  mounted() {
    this.$pageTitle('WLAN Interfaces')
      this.$socket.on(WLAN_RECEIVE_INTERFACES, (interfaces) => {
        this.wlanInterfaces = interfaces;
      })
      this.$socket.emit(WLAN_GET_INTERFACES);
  }
}
</script>
