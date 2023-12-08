import path from "path";
import User from "../models/User.js";

import { __dirname } from "../app.js";

class UserController {
  static async getDataUser(req, res) {
    try {
      const userId = req.session.userId;

      if (!userId) {
        return res.status(401).json({
          message: "No se proporcionó el ID del usuario en la cookie.",
        });
      }

      const user = await User.findById(userId);

      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado." });

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  static async getUserDataById(req, res) {
    const id = req.query.id;

    if (!id)
      return res
        .status(400)
        .json({ message: "No se proporcionó el ID del usuario." });

    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado." });

    return res.status(200).json(user);
  }

  static async getImgProfileUser(req, res) {
    try {
      const userId = req.session.userId;

      if (!userId) {
        return res.status(401).json({
          message: "No se proporcionó el ID del usuario en la cookie.",
        });
      }

      const user = await User.findById(userId);

      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado." });

      const imagePath = path.join(__dirname, user.foto_perfil);
      return res.sendFile(imagePath);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  static async getAllUsers(req, res) {
    try {
      const users = await User.find();

      if (!users) return res.status(404).json({ message: "No hay usuarios." });

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default UserController;
