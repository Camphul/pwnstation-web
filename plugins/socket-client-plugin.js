import io from 'socket.io-client'
import { handleClientConnectionStatus, isClientConnected } from "~/assets/pwnsocket/client";
export default ({ app, store, env }, inject) => {
  const socket = io(env.wsUrl || 'ws://localhost:3000')
  inject('socket', socket)
  inject('isConnected', () => isClientConnected(store))
  handleClientConnectionStatus(store, socket)

}
