import si from "systeminformation";
import consola from "consola";
import {
  WLAN_GET_INTERFACES,
  WLAN_RECEIVE_INTERFACES,
  WLAN_SET_OPERSTATE,
  WLAN_SET_WIRELESS_TYPE
} from "../messages.js";
import {
  getWirelessType,
  setInterfaceOperation,
  setWirelessType,
  WIRELESS_TYPE_MANAGED,
  WIRELESS_TYPE_MONITOR
} from "../../sys/network.js";
import notify from "../../sys/notify.js";

let cachedInterfaces = []
function sendNetInterfaces(socket, broadcast = false, io=null) {
  si.networkInterfaces((interfaces) => {
    si.wifiInterfaces((wifiInterfaces) => {
      consola.debug("Sending network interfaces  ")
      const wlan1 = wifiInterfaces.find(w => w.iface === 'wlan1')
      if(wlan1 !== undefined) {
        const wType = getWirelessType(wlan1.iface);
        interfaces.push({
          iface: wlan1.iface,
          ifaceName: 'wlan1',
          mac: wlan1.mac,
          operstate: 'external',
          internal: false,
          virtual: false,
          type: 'wireless',
          monitorAbility: true,
          wirelessType: wType
        })
      }
      cachedInterfaces = interfaces
      if (broadcast) {
        io.emit(WLAN_RECEIVE_INTERFACES, interfaces)
      } else {
        socket.emit(WLAN_RECEIVE_INTERFACES, interfaces)
      }
    })
  })
}

export function wsHandleNetworkInterfaces(socket, io) {
  socket.on(WLAN_GET_INTERFACES, function(fn) {
    sendNetInterfaces(socket);
  })
  socket.on(WLAN_SET_WIRELESS_TYPE, (ops) => {
    if(typeof ops.iface !== "string" || typeof ops.wirelessType !== "boolean") {
      consola.info("Invalid option types")
      notify(socket, io, {
        message: 'Invalid types passed',
        color: 'red'
      })
      return;
    }
    const iface = ops.iface;
    if(iface == null || !cachedInterfaces.map((i) => i.ifaceName).includes(iface)) {
      consola.info('Sent invalid interface')
      notify(socket, io, {
        message: 'Invalid interface passed',
        color: 'red'
      })
      return;
    }
    if(ops.wirelessType) {
      // SET TO MONITOR MODE
      consola.info('Setting to monitor mode')
      const response = setWirelessType(WIRELESS_TYPE_MONITOR)
      if(response !== WIRELESS_TYPE_MONITOR) {
        consola.log('Failed to set to monitor mode')
        notify(socket, io, {
          message: 'Interface ' + iface +' set to monitor mode',
          color: 'success'
        }, true)
      } else {
        notify(socket, io, {
          message: 'Failed to set interface ' + iface +' to monitor mode: ' + response,
          color: 'error'
        })
      }
      sendNetInterfaces(socket, true, io)
    } else {
      // SET TO MANAGED MODE
      consola.info('Setting to managed mode')
      const response = setWirelessType(WIRELESS_TYPE_MANAGED)
      if(response !== WIRELESS_TYPE_MANAGED) {
        consola.log('Failed to set to managed mode')
        notify(socket, io, {
          message: 'Interface ' + iface +' set to monitor'
        }, true)
      } else {
        notify(socket, io, {
          message: 'Failed to set interface ' + iface +' to managed mode: ' + response,
          color: 'error'
        })
      }
      sendNetInterfaces(socket, true, io)
    }
  })
  socket.on(WLAN_SET_OPERSTATE, (ops) => {
    if(typeof ops.iface !== "string" || typeof ops.opStatus !== "boolean") {
      consola.info("Invalid option types")
      notify(socket, io, {
        message: 'Invalid types passed',
        color: 'red'
      })
      return;
    }
    const iface = ops.iface;
    if(iface == null || !cachedInterfaces.map((i) => i.ifaceName).includes(iface)) {
      consola.info('Sent invalid interface for changing wlan opstatus')
      notify(socket, io, {
        message: 'Interface ' + iface +' set to monitor'
      }, true)
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
