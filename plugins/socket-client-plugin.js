import io from 'socket.io-client'
import { handleClientConnectionStatus, isClientConnected } from "~/assets/pwnsocket/client";
export default ({ app, store, env, $config }, inject) => {
  const socket = io("ws://pwn.station:3000")
  inject('socket', socket)
  inject('isConnected', () => isClientConnected(store))
  handleClientConnectionStatus(store, socket)
}
