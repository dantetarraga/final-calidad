import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import { createServer } from "node:http";
import path, { dirname } from "path";
import { Server as SocketServer } from "socket.io";
import { fileURLToPath } from "url";
import "./config/database.js";
import messageController from "./controller/message.js";
import authRouter from "./routes/auth.js";
import commentRouter from "./routes/comment.js";
import friendRouter from "./routes/friend.js";
import messageRouter from "./routes/message.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

io.on("connection", (socket) => {
  // console.log(socket.id);

  socket.on("message", async (data) => {
    try {
      const newMessage = await messageController.createMessage(data);

      io.emit("message", {
        contenido: newMessage.contenido,
        from: newMessage.remitente,
      });
      console.error("MENSAJE GUARDADO");
    } catch (error) {
      console.log(data);
      console.log(data.from);

      console.log(data.contenido);

      console.log(data.remitente);

      console.error("Error al guardar el mensaje CON SOCKETS:", error);
    }
  });
});

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", postRouter);
app.use("/", commentRouter);
app.use("/", friendRouter);
app.use("/", messageRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
