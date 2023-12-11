import { Router } from "express";
import messageController from "../controller/message.js";

const messageRouter = Router();

messageRouter.post("/send", messageController.createMessage);
//messageRouter.get("/view-All", messageController.getAllMessages);
messageRouter.get("/view-all", messageController.getAllMessages);



// Agrega otras rutas para manejar los mensajes, si es necesario

export default messageRouter;
