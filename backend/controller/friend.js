import User from "../models/User.js";

class FriendController {
  static async addFriend(req, res) {
    try {
      // const usuarioId = req.session.userId;
      const usuarioId = req.body.usuarioId;
      const amigoId = req.body.amigoId;
      const estado = req.body.estado;

      const usuario = await User.findById(usuarioId);
      const amigo = await User.findById(amigoId);

      if (!usuario || !amigo)
        return res.status(404).json({ error: "Usuario no encontrado" });

      if (!amigo.amigos.includes(usuarioId) && estado == "aceptado") {
        usuario.amigos.push(amigoId);
        amigo.amigos.push(usuarioId);
        usuario.solicitudes_amistad = usuario.solicitudes_amistad.filter(
          (solicitud) => solicitud.usuario != amigoId
        );
        usuario.save();
        amigo.save();
      }

      return res.status(200).json({
        mensaje: "Amigo agregado con exito",
        usuario: usuario,
        amigo: amigo,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error al agregar amigo", mensaje: error.message });
    }
  }

  static async sendRequest(req, res) {
    try {
      const emisorId = req.session.userId;
      const receptorId = req.body.receptorId;

      const emisor = await User.findById(emisorId);
      const receptor = await User.findById(receptorId);

      if (!emisor || !receptor)
        return res.status(404).json({ error: "Usuario no encontrado" });

      if (
        !receptor.amigos.includes(emisorId) &&
        !emisor.amigos.includes(receptorId) &&
        !receptor.solicitudes_amistad.find(
          (solicitud) => solicitud.usuario == emisorId
        )
      ) {
        receptor.solicitudes_amistad.push({ usuario: emisorId });
        await receptor.save();
      }

      return res.status(200).json({
        mensaje: "Solicitud de amistad enviada con éxito",
        usuario: receptor,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Error al enviar solicitud de amistad",
        mensaje: error.message,
      });
    }
  }

  static async rejectRequest(req, res) {
    try {
      const usuarioId = req.session.userId;
      const solicitudId = req.body.solicitudId;
      const estado = req.body.estado;

      const usuario = await User.findById(usuarioId);

      if (!usuario)
        return res.status(404).json({ error: "Usuario no encontrado" });

      if (
        usuario.solicitudes_amistad.find(
          (solicitud) => solicitud.usuario == solicitudId
        ) &&
        estado === "rechazado"
      ) {
        usuario.solicitudes_amistad = usuario.solicitudes_amistad.filter(
          (solicitud) => solicitud.usuario != solicitudId
        );
        usuario.save();
      }

      return res.status(200).json({
        mensaje: "Solicitud de amistad rechazada con exito",
        usuario: usuario,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Error al rechazar solicitud de amistad",
        mensaje: error.message,
      });
    }
  }

  static async getFriends(req, res) {
    try {
      const usuarioId = "65722faa80c044c007d55362";

      const usuario = await User.findById(usuarioId);

      if (!usuario)
        return res.status(404).json({ error: "Usuario no encontrado" });

      const amigos = await User.find({ _id: { $in: usuario.amigos } }).select(
        "nombre apellidos sexo fecha_nacimiento foto_perfil"
      );

      return res.status(200).json(amigos);
    } catch (error) {
      return res.status(500).json({
        error: "Error al obtener amigos",
        mensaje: error.message,
      });
    }
  }

  static async getFriendRequests(req, res) {
    const usuarioId = req.session.userId;

    const usuario = await User.findById(usuarioId);

    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    console.log(usuario);

    const solicitudes = await User.find({
      "solicitudes_amistad.estado": "pendiente",
    }).select("nombre apellidos sexo fecha_nacimiento foto_perfil");

    if (!solicitudes)
      return res
        .status(404)
        .json({ error: "No se encontraron solicitudes de amistad" });

    return res.status(200).json(solicitudes);
  }

  static async suggestFriends(req, res) {
    const usuarioId = req.session.userId;

    const usuario = await User.findById(usuarioId);

    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    const users = await User.find().select("nombre apellidos sexo foto_perfil");

    const suggestions = users.filter((user) => {
      return (
        !usuario.amigos.includes(user._id) &&
        !usuario.solicitudes_amistad.find(
          (solicitud) => solicitud.usuario == user._id
        ) &&
        !user._id.equals(usuario._id)
      );
    });

    return res.status(200).json(suggestions);
  }
}

export default FriendController;
