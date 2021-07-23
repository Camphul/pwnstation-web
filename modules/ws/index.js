import http from 'http'
import socketIO from 'socket.io'
import consola from 'consola'
import { handleServerWS } from '../../assets/pwnsocket'
export default function () {
  this.nuxt.hook('render:before', (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) => new Promise(resolve => server.listen(port || 3000, host || '0', resolve))
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))
    consola.info("Setup websocket handle")
    handleServerWS(io);
  })
}
