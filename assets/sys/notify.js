import consola from 'consola'
import colors from 'vuetify/es5/util/colors'
import { NOTIFY_SNACKBAR } from "../pwnsocket/messages.js";

const theme = {
  primary: colors.blue.darken2,
  accent: colors.grey.darken3,
  secondary: colors.amber.darken3,
  info: colors.teal.lighten1,
  warning: colors.amber.base,
  error: colors.deepOrange.accent,
  success: colors.green.accent3
}
function rawNotify(socket, io = undefined, ops, broadcast=false) {
  if(broadcast) {
    if(io === undefined) {
      consola.error("Wanted to broadcast but io was not passed as argument")
      return
    }
    io.emit(NOTIFY_SNACKBAR, ops)
  } else {
    socket.emit(NOTIFY_SNACKBAR, ops)
  }
}

export default function(socket, io = undefined, broadcast=false) {
  return {
    error(msg) {
      rawNotify(socket, io, {
        message: msg,
        color: theme.error
      }, broadcast)
    },
    info(msg) {
      rawNotify(socket, io, {
        message: msg,
        color: theme.info
      }, broadcast)
    },
    success(msg) {
      rawNotify(socket, io, {
        message: msg,
        color: theme.success
      }, broadcast)
    },
    other(opts) {
      rawNotify(socket, io, opts, broadcast)
    }
  }
}
