import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true,
  },
  remitente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receptor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fecha_envio: {
    type: Date, // Utiliza el tipo Date para almacenar el timestamp
    default: Date.now, // Establece la fecha de envío como la fecha actual al crear el documento
  },
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
