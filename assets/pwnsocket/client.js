import { NOTIFY_SNACKBAR } from "~/assets/pwnsocket/messages";

export function isClientConnected(store) {
  return store.getters['ws/connected']
}

export function handleClientConnectionStatus(store, socket) {
  socket.on('connect', ()=> {
    store.dispatch('ws/setConnected', true).then(() => {
      socket.on(NOTIFY_SNACKBAR, (ops) => {
        store.dispatch('notifications/add', ops)
      })
    })

  });
  socket.on('disconnect', ()=> {
    store.dispatch('ws/setConnected', false)
  });
}
