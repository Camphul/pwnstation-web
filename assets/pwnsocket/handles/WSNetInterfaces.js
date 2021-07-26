import si from "systeminformation";
import consola from "consola";
import { WLAN_GET_INTERFACES, WLAN_RECEIVE_INTERFACES, WLAN_SET_OPERSTATE } from "../messages.js";
import { setInterfaceOperation } from "../../net/network.js";

let cachedInterfaces = []
function sendNetInterfaces(socket, broadcast = false, io=null) {
  si.networkInterfaces((interfaces) => {
    consola.debug("Sending network interfaces  ")
    if(process.env.CPU_ARCH !== 'arm64') {
      cachedInterfaces = interfaces
      if(broadcast) {
        io.emit(WLAN_RECEIVE_INTERFACES, interfaces)
      } else {
        socket.emit(WLAN_RECEIVE_INTERFACES, interfaces)
      }
    } else {
      const filteredInterfaces = interfaces// .filter((networkInteface) => networkInteface.ifaceName.)
      cachedInterfaces = filteredInterfaces
      if(broadcast) {
        io.emit(WLAN_RECEIVE_INTERFACES, filteredInterfaces)
      } else {
        socket.emit(WLAN_RECEIVE_INTERFACES, filteredInterfaces)
      }
    }
  })
}

export function wsHandleNetworkInterfaces(socket, io) {
  socket.on(WLAN_GET_INTERFACES, function(fn) {
    sendNetInterfaces(socket);
  })
  socket.on(WLAN_SET_OPERSTATE, (ops) => {
    if(typeof ops.iface !== "string" || typeof ops.opStatus !== "boolean") {
      consola.info("Invalid option types")
      return;
    }
    const iface = ops.iface;
    if(iface == null || !cachedInterfaces.map((i) => i.ifaceName).includes(iface)) {
      consola.info('Sent invalid interface for changing wlan opstatus')
      return;
    }
    const opStatus = ops.opStatus
    const operstatus = opStatus ? 'up' : 'down'
    if(setInterfaceOperation(iface, operstatus)) {
      consola.info("Success setting "  + iface + " network operation status to " + operstatus)
      sendNetInterfaces(socket, true, io)
    } else {
      sendNetInterfaces(socket, true, io)
      consola.info("Failed setting "  + iface + " network operation status to " + operstatus)
    }
  })

}
