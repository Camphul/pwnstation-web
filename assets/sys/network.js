// eslint-disable-next-line camelcase
import { execSync } from 'child_process'
import consola from 'consola'
import { asyncExecOneLineResponse } from "./system.js";
export const WIRELESS_TYPE_MANAGED = 'managed'
export const WIRELESS_TYPE_MONITOR = 'monitor'
export const WIRELESS_TYPE_OTHER = 'other'
export function setInterfaceOperation(name, state) {
  try {
    execSync('sudo ip link set ' + name + ' ' + state);
    return true
  } catch (error) {
    consola.error(error.message)
    return false
    // error.status;  // Might be 127 in your example.
    // error.message; // Holds the message you typically want.
    // error.stderr;  // Holds the stderr output. Use `.toString()`.
    // error.stdout;  // Holds the stdout output. Use `.toString()`.
  }
}

export function setWirelessType(mode) {
  return asyncExecOneLineResponse('bash ~/wifi ' + mode)
}

export function getWirelessType(ifaceName) {
  return asyncExecOneLineResponse('iw ' + ifaceName + ' info | grep -i type | awk \'{ sub(/^[ \\t]+/, ""); print $2}\'')
}
