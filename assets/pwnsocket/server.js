import { exec } from 'child_process'
import consola from 'consola'
import {
  HOST_REBOOT,
  HOST_SHUTDOWN,
} from "./messages";
import { wsHandleNetworkInterfaces } from './handles/WSNetInterfaces'
import { wsHandleHostStats } from './handles/WSHostStats'
import { wsHandleTerminalEmulator } from './handles/WSTerminalEmulator'


function wsHandleShutdownAndReboot(socket, io) {
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
}


export function handleServerWS(io) {
  // Add socket.io events
  io.on('connection', (socket) => {
    wsHandleShutdownAndReboot(socket, io)
    wsHandleNetworkInterfaces(socket, io)
    wsHandleHostStats(io)
    wsHandleTerminalEmulator(socket, io)
  })
}

