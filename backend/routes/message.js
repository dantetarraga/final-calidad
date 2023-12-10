import { Router } from "express";
import messageController from "../controller/message.js";

const messageRouter = Router();

messageRouter.post("/send", messageController.createMessage);
messageRouter.get("/view-all", messageController.getAllMessages);

export default messageRouter;
