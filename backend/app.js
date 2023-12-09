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

// Importa el controlador de mensajes
import messageController from "./controller/message.js"; // Asegúrate de tener la ruta correcta

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("message", async (data) => {
    try {
      // Crea un nuevo mensaje utilizando el controlador
      const newMessage = await messageController.createMessage(data);

      // Emite el mensaje a todos los clientes conectados
      io.emit("message", {
        contenido: newMessage.contenido,
        from: newMessage.remitente,
      });
      console.error("MENSAJE GUARDADO");

    } catch (error) {

      console.log(data)
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      console.log(data.from)
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

      console.log(data.contenido)
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

      console.log(data.remitente)

      console.error('Error al guardar el mensaje CON SOCKETS:', error);
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
    origin: "*", // Esto permitirá solicitudes desde cualquier origen
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Asegúrate de tener las rutas correctas para los routers
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import messageRouter from './routes/message.js';

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", messageRouter);
app.use("/", postRouter);

app.get("/", function (req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>views: " + req.session.views + "</p>");
    res.write("<p>User: " + req.session.userId + "</p>");

    res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("welcome to the session demo. refresh!");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
