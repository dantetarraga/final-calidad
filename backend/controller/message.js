import Message from '../models/Message.js';

class messageController {
  static async createMessage(data) {
    try {
      const { contenido, remitente, receptor } = data;

      if (!contenido || !remitente || !receptor) {
        throw new Error("Los campos contenido, remitente y receptor son requeridos.");
      }

      const newMessage = new Message({ contenido, remitente, receptor });

      const savedMessage = await newMessage.save();
      return savedMessage;
    } catch (error) {
      throw new Error(`Error al guardar el mensaje: ${error.message}`);
    }
  }

  static async getAllMessages() {
    try {
      // Obtiene todos los mensajes de la base de datos
      const messages = await Message.find();
      return messages;
    } catch (error) {
      throw new Error(`Error al obtener todos los mensajes: ${error.message}`);
    }
  }

  static async getAllMessages(req, res) {
    try {
      const messages = await Message.find();

      if (!messages) return res.status(404).json({ message: "No hay usuarios." });

      return res.status(200).json(messages);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default messageController;
