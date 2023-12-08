import { Router } from "express";
import FriendController from "../controller/friend.js";

const friendRouter = Router();

friendRouter.post("/agregar-amigo", FriendController.addFriend);
friendRouter.post("/enviar-solicitud", FriendController.sendRequest);
friendRouter.post("/rechazar-solicitud", FriendController.rejectRequest);
friendRouter.get("/amigos", FriendController.getFriends);
friendRouter.get("/solicitudes", FriendController.getFriendRequests);

export default friendRouter;
