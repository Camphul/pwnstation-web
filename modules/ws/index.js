import http from 'http'
import socketIO from 'socket.io'
import consola from 'consola'
import { handleServerWS } from "../../assets/pwnsocket/server";
export default function () {
  this.nuxt.hook('render:before', (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app)
    const acceptedCorsOrigins = process.env.WS_CORS_HOSTNAMES;
    consola.info("Accepted cross origins is array: " + Array.isArray(acceptedCorsOrigins))
    consola.info("Accepted CORS origins: " + acceptedCorsOrigins)
    const io = socketIO(server, {
      origins: acceptedCorsOrigins,
      handlePreflightRequest: (req, res) => {
        const headers = {
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Origin": req.headers.origin, // or the specific origin you want to give access to,
          "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
      }
    })

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) => new Promise(resolve => server.listen(port || process.env.SERVER_PORT, host || process.env.SERVER_HOST, resolve))
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))
    consola.info("Setup websocket handle")
    handleServerWS(io);
  })
}
