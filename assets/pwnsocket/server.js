import { exec } from 'child_process'
import consola from 'consola'
import si from 'systeminformation'
import {
  HOST_REBOOT,
  HOST_SHUTDOWN,
  HOST_STATS_UPDATE,
  WLAN_GET_INTERFACES,
  WLAN_RECEIVE_INTERFACES
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
    socket.on(WLAN_GET_INTERFACES, function(fn) {
      consola.info("Requesting wlan interfaces")
      si.wifiInterfaces((interfaces) => {
        socket.emit(WLAN_RECEIVE_INTERFACES, interfaces)
      })
    })
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
