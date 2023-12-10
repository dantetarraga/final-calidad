import { model, Schema } from "mongoose";
import { getDateTimePeru } from "../utils/dateTime.js";

const MessageSchema = new Schema({
  contenido: {
    type: String,
    required: true,
  },
  remitente: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receptor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fecha_envio: {
    type: String,
    default: getDateTimePeru(),
  },
});

const Message = model("Message", MessageSchema);

export default Message;
