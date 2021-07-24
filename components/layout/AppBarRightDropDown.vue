<template>
  <v-menu left bottom :close-on-content-click="false" nudge-left="8px;" nudge-top="8px;">
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span>Manage Host</span>
      </v-card-title>
      <v-card-text>
        <v-divider class="ma-0 pa-0 mb-2"></v-divider>
        <v-list class="mt-0 pt-0 mb-0 pb-0">
          <v-list-item>
            <v-btn block color="warning" @click="handleReboot()">
              <v-icon>mdi-restart</v-icon>
              <span>Reboot host</span>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block color="red" @click="handleShutdown()">
              <v-icon>mdi-power</v-icon>
              <span>Shutdown host</span>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card-text>
      <ConfirmationDialog ref="confirm"></ConfirmationDialog>
    </v-card>
  </v-menu>
</template>
<script>
import { HOST_REBOOT, HOST_SHUTDOWN } from "~/assets/pwnsocket/messages";
import ConfirmationDialog from "~/components/dialogs/ConfirmationDialog";

export default {
  components: {
    ConfirmationDialog
  },
  methods: {
    async handleShutdown() {
      if (
        await this.$refs.confirm.open(
          "Confirm Shutdown",
          "Are you sure you want to shutdown",
          {
            color: 'primary'
          }
        )
      ) {
        this.$socket.emit(HOST_SHUTDOWN)
      }
    },
    async handleReboot() {
      if (
        await this.$refs.confirm.open(
          "Confirm Reboot",
          "Are you sure you want to reboot", {
            color: 'primary'
          }
        )
      ) {
        this.$socket.emit(HOST_REBOOT)
      }
    },
  }
}
</script>
