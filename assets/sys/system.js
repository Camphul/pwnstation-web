import { execSync } from "child_process";
import consola from "consola";

export function asyncExecOneLineResponse(cmd) {
  try {
    let buffer = execSync(cmd, {
      cwd: process.env.NODE_ENV === 'production' ? process.env.CWD_DIR_PROD : process.env.CWD_DIR_DEV
    })
    buffer = buffer.toString().replace(/(\r\n|\n|\r)/gm, "")
    consola.debug("Executed buffer: '" + buffer + "'")
    return buffer
  } catch (error) {
    consola.error("Failed to exec command: " + error.message)
    return error.message;
  }
}
