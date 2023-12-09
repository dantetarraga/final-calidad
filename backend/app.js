import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import { createServer } from "node:http";
import path, { dirname } from "path";
import { Server as SocketServer} from "socket.io";
import { fileURLToPath } from "url";
import "./config/database.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import { Socket } from "node:dgram";
import Message from "./models/Message.js";
import { getDateTimePeru } from "./utils/dateTime.js";


export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const server = createServer(app);

const io = new SocketServer(server);


io.on("connection", (socket) => {
  console.log("Cliente conectado");
  console.log(socket.id);

  socket.on("message", async (data) => {
    try {
      const { contenido, remitente, receptor } = data;
      const newMessage = new Message({
        contenido,
        remitente,
        receptor,
        fecha_envio: getDateTimePeru(), // Actualizar la fecha de envío si es necesario
      });
      await newMessage.save();
      
      io.emit("message", newMessage);
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});



const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

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
