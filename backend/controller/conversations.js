import jwt from 'jsonwebtoken';
import { Conversacion } from '../models/Conversation.js';

class conversacionesController {

    static async crearConversacion(req, res) {
        const nuevaConversacion = new Conversacion({ ...req.body });
        try {
            const conversacionInsertada = await nuevaConversacion.save();
            return res.status(201).json(conversacionInsertada);
        } catch (error) {
            return res.status(500).json({ error: "Error al crear la conversación" });
        }
    }

    static async obtenerConversacionesUsuario(req, res) {
        const token = req.headers.authorization.split(' ')[1]

        if (!token)
            return res.status(401).json({ error: 'No se ha enviado el token' })

        try {
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err)
                    return res.status(403).json({ error: 'Token inválido' })
            })

            const userId = req.params.userId;
            const conversaciones = await Conversacion.find({ participantes: userId });
            return res.status(200).json(conversaciones);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener las conversaciones del usuario" });
        }
    }

    static async obtenerConversacionPorId(req, res) {
        const token = req.headers.authorization.split(' ')[1]

        if (!token)
            return res.status(401).json({ error: 'No se ha enviado el token' })

        try {
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err)
                    return res.status(403).json({ error: 'Token inválido' })
            })

            const conversacionId = req.params.conversacionId;
            const conversacion = await Conversacion.findById(conversacionId);
            if (!conversacion) {
                return res.status(404).json({ error: 'Conversación no encontrada' });
            }
            return res.status(200).json(conversacion);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener la conversación" });
        }
    }

    // Eliminar conversaciones?

}

export default conversacionesController;