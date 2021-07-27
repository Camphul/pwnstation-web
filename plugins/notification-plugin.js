import VSnackbars from 'v-snackbars';
import Vue from 'vue'
Vue.component('v-snackbars', VSnackbars);

export default ({ store }, inject) => {
  inject('notify', (opts) => store.dispatch('notifications/add', opts))

}
