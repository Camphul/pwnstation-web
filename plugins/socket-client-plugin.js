import io from 'socket.io-client'
import { handleClientConnectionStatus, isClientConnected } from "~/assets/pwnsocket/client";
export default ({ app, store, env, $config }, inject) => {
  const socket = io(env.NODE_ENV === 'production' ? "ws://pwn.station" : 'ws://localhost:3000')
  inject('socket', socket)
  inject('isConnected', () => isClientConnected(store))
  handleClientConnectionStatus(store, socket)
}
