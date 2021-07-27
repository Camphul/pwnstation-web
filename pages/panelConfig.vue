<template>
  <v-row>
      <v-col cols="12" class="pa-3 d-flex flex-column">
        <v-card>
          <v-card-title>Panel Updater</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            If  you wish to update PwnPanel Web UI please click the button below.
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="primary" @click="handlePanelUpdate">Update PwnPanel to latest version</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
  </v-row>
</template>
<script>
export default {
  mounted() {
    this.$pageTitle("PwnStation Configuration");
  },
  methods: {
    handlePanelUpdate() {
      this.$notify({message: 'Updating panel'})
    }
  }
};
</script>
