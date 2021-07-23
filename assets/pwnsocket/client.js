export function isClientConnected(store) {
  return store.getters['ws/connected']
}

export function handleClientConnectionStatus(store, socket) {
  socket.on('connect', ()=> {
    store.dispatch('ws/setConnected', true)
  });
  socket.on('disconnect', ()=> {
    store.dispatch('ws/setConnected', false)
  });
}
