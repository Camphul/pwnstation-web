import { spawn } from 'child_process'
import readline from 'readline'
import consola from 'consola'
import { TERM_ERROR, TERM_SEND_COMMAND, TERM_STDERR, TERM_STDOUT } from "../messages.js";
import { asyncExecOneLineResponse } from "../../sys/system.js";
const processMap = {}
const processControllerMap = {}
function cleanOutput(ps, line) {
  line = line.toString().replace(/(\r\n|\n|\r)/gm, "")
  return {
    line,
    pwd: asyncExecOneLineResponse('pwdx ' + ps.pid + ' | awk \'{ sub(/^[ \\t]+/, ""); print $2}\'')
  }
}

export function wsHandleTerminalEmulator(socket, io) {
  const sockId = socket.id
  const ps = spawn(process.env.SHELL,{
    cwd: process.env.HOME,
    env: process.env,
  })
  processMap[sockId] = ps
  const rlStdout = readline.createInterface({
    input: ps.stdout,
  })
  const rlStderr = readline.createInterface({
    input: ps.stderr
  })

  rlStdout.on('line', (data) => {
    data = cleanOutput(ps, data)
    consola.log('Socket %s terminal socket stdout write: \'%s\'', socket.id, data)
    socket.emit(TERM_STDOUT, data)
  });
  rlStderr.on('line', (data) => {
    data = cleanOutput(ps, data)
    consola.log('Socket %s terminal socket stderr write: \'%s\'', socket.id, data)
    socket.emit(TERM_STDERR, data)
  });
  ps.on('error', (err) => {
    consola.log('Socket %s terminal received error: \'%s\'', socket.id, err)
    socket.volatile.emit(TERM_ERROR, err)
  });
  consola.info('Spawned new client process')
  socket.on('disconnect', (reason) => {
    ps.kill(9);
    delete processControllerMap[sockId]
    delete processMap[sockId]
    consola.info('Cleaning up terminal due to socket disconnect: %s', reason)
    consola.info('processMap length: ' + processMap.length)

  })
  socket.on(TERM_SEND_COMMAND, (cmd) => {
    const { command } = cmd
    consola.info('Running command %s on terminal of socket %s', command, socket.id)
    processMap[socket.id].stdin.write(command + '\n')
  })
}
