import { Router } from "express";
import CommentController from "../controller/comment.js";

const commentRouter = Router();

commentRouter.post("/comentar", CommentController.commentPost);
commentRouter.post("/comentarios", CommentController.getComments);

export default commentRouter;
