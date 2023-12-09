import { model, Schema } from "mongoose";
import Message from "./Message.js";

const ConversationSchema = new Schema({
  participantes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  mensajes: [Message.schema],
});

const Conversacion = model("Conversacion", ConversationSchema);

export default Conversacion;
