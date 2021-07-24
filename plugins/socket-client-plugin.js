import io from 'socket.io-client'
import { handleClientConnectionStatus, isClientConnected } from "~/assets/pwnsocket/client";
export default ({ app, store, env, $config }, inject) => {
  const socket = io($config.WS_URL)
  inject('socket', socket)
  inject('isConnected', () => isClientConnected(store))
  handleClientConnectionStatus(store, socket)
}
