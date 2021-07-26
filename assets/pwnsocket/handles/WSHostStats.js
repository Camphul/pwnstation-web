import si from "systeminformation";
import consola from "consola";
import { HOST_STATS_UPDATE } from "../messages.js";
const SYS_STATS_TIMER_INTERVAL = 5000
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
export function wsHandleHostStats(io) {
  return setInterval(() => {
    consola.debug("Obtaining system status")
    getHostStats((data) => {
      io.emit(HOST_STATS_UPDATE, data)
    });
  }, SYS_STATS_TIMER_INTERVAL)
}
