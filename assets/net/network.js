// eslint-disable-next-line camelcase
import child_process from 'child_process'
import consola from 'consola'
export function setInterfaceOperation(name, state) {
  try {
    child_process.execSync('sudo ip link set ' + name + ' ' + state);
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
