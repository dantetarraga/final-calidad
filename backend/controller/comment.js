import Post from "../models/Post.js";

class CommentController {
  static async commentPost(req, res) {
    try {
      const { contenido, idPost } = req.body;
      const usuario = req.session.userId;

      if (!usuario)
        return res
          .status(400)
          .json({ message: "No se proporciono Id del usuario." });

      const post = await Post.findById(idPost);

      if (!post)
        return res.status(404).json({ message: "No existe la publicacion." });

      const newComment = {
        usuario,
        contenido,
      };

      post.comentarios.push(newComment);

      const savePost = await post.save();

      if (!savePost)
        return res.status(500).json({ message: "Error al guardar." });

      return res.status(200).json(newComment);
    } catch (err) {
      return res
        .status(500)
        .json({ error: err.message, message: "Error al guardar." });
    }
  }

  static async getComments(req, res) {
    const { idPost } = req.body;

    const post = await Post.findById(idPost);

    if (!post)
      return res.status(404).json({ message: "No existe la publicacion." });

    return res.status(200).json(post.comentarios);
  }
}

export default CommentController;
