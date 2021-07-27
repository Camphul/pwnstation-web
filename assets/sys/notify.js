import { NOTIFY_SNACKBAR } from "../pwnsocket/messages.js";

export default function(socket, io = undefined, ops, broadcast=false) {
  if(broadcast) {
    io.emit(NOTIFY_SNACKBAR, ops)
  } else {
    socket.emit(NOTIFY_SNACKBAR, ops)
  }
}
