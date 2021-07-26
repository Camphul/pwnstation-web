// eslint-disable-next-line camelcase
import { execSync } from 'child_process'
import consola from 'consola'
export const WIRELESS_TYPE_MANAGED = 'managed'
export const WIRELESS_TYPE_MONITOR = 'managed'
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
  try {
    const buffer = execSync('bash ~/wifi ' + mode, {
      cwd: process.env.NODE_ENV === 'production' ? process.env.CWD_DIR_PROD : process.env.CWD_DIR_DEV
    })
    consola.info("Response buffer: '" + buffer + "'")
    return buffer
  } catch (error) {
    consola.error("Failed to exec wifi: " + error.message)
    return WIRELESS_TYPE_OTHER;
  }
}

export function getWirelessType(ifaceName) {
  try {
    return execSync('iw ' + ifaceName + ' info | grep -i type | awk \'{ sub(/^[ \\t]+/, ""); print $2}\'')
  } catch (error) {
    consola.error(error.message)
    return WIRELESS_TYPE_OTHER;
  }
}
