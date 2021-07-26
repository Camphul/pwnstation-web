import { exec } from 'child_process'
import consola from 'consola'
import si from 'systeminformation'
import { setInterfaceOperation } from "../net/network";
import {
  HOST_REBOOT,
  HOST_SHUTDOWN,
  HOST_STATS_UPDATE,
  WLAN_GET_INTERFACES,
  WLAN_RECEIVE_INTERFACES, WLAN_SET_OPERSTATE
} from "./messages";
const SYS_STATS_TIMER_INTERVAL = 5000


export function handleServerWS(io) {
  // Add socket.io events
  hostStatsServerWSTask(io)
  io.on('connection', (socket) => {
    socket.on(HOST_SHUTDOWN, function (fn) {
      consola.info("Shutting down");
      exec("sudo poweroff", {
        cwd: process.env.CWD_DIR,
      });
    })
    socket.on(HOST_REBOOT, function (fn) {
      consola.info("Reboot signal received")
      exec("sudo reboot", {
        cwd: process.env.CWD_DIR,
      });
    })
    wlanInterfacesHandlers(socket, io)
  })
}
let cachedInterfaces = []
function sendNetInterfaces(socket, broadcast = false, io=null) {
  si.networkInterfaces((interfaces) => {
    consola.info("Sending network interfaces  ")
    if(process.env.CPU_ARCH !== 'arm64') {
      cachedInterfaces = interfaces
      if(broadcast) {
        io.emit(WLAN_RECEIVE_INTERFACES, interfaces)
      } else {
        socket.emit(WLAN_RECEIVE_INTERFACES, interfaces)
      }
    } else {
      const filteredInterfaces = interfaces.filter((networkInteface) => networkInteface.ifaceName.startsWith("wlan"))
      cachedInterfaces = filteredInterfaces
      if(broadcast) {
        io.emit(WLAN_RECEIVE_INTERFACES, interfaces)
      } else {
        socket.emit(WLAN_RECEIVE_INTERFACES, filteredInterfaces)
      }
    }
  })
}

function wlanInterfacesHandlers(socket, io) {
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

async function getHostStats(cb = (data) => {}) {
  try {
    const tempData = await si.cpuTemperature()
    const { cores, speed, speedMin, speedMax } = await si.cpu()
    const { total, free, used, available } = await si.mem();
    const tempStats = {
      cores: tempData.cores,
      main: tempData.main,
    }
    const cpuStats = { cores, speed, speedMin, speedMax }
    const ramStats = { total, free, used, available }
    // eslint-disable-next-line node/no-callback-literal
    cb({
      ok: true,
      status: {
        cpuTemps: tempStats,
        cpu: cpuStats,
        ram: ramStats,
      }
    });
  } catch (e) {
    // eslint-disable-next-line node/no-callback-literal
    cb({
      ok: false,
      status: {}
    });
  }
}

/**
 * Sends system performance out periodically
 * @param io
 */
export function hostStatsServerWSTask(io) {
  return setInterval(() => {
    consola.debug("Obtaining system status")
    getHostStats((data) => {
      io.emit(HOST_STATS_UPDATE, data)
    });
  }, SYS_STATS_TIMER_INTERVAL)
}
