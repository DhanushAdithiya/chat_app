//IMPORTS
import dotenv from "dotenv";
import http from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import replaceTempaltes from "./utils/replaceTemplates.js";
import { Server } from "socket.io";

// ENV VARIABLES
dotenv.config();
const PORT = process.env.PORT || 3000;
const DB = process.env.DB || "mongodb://localhost:27017/chat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const server = http.createServer(app);

mongoose
  .connect(DB)
  .then(() => console.log("DB connected"))
  .catch((e: Error) => {
    console.error("An error occured: ", e);
  });

app.get("/", (_, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/join-room/:id", async (req, res) => {
  const room = await fetch(`http://127.0.0.1:${PORT}/room/${req.params.id}`);
  const response = await room.json();
  if (room.status != 200) {
    res.sendFile(path.resolve("public/roomNotFound.html"));
  } else {
    const template = fs.readFileSync(path.resolve("public/room.html"), "utf8");
    const html = replaceTempaltes(template, response);
    res.send(html);
  }
});

// This command is to get all the static js files present in a html file
app.get("/js/:location(*)", (req, res) => {
  const location = req.params.location;
  res.set("Content-Type", "application/javascript");
  res.sendFile(__dirname + `/${location}`);
});

import loginRouter from "./routes/user.routes.js";
import roomRouter from "./routes/rooms.routes.js";

app.use("/user", loginRouter);
app.use("/", roomRouter);


const io = new Server(server);

io.on('connection', (socket) => {
  console.log("user entered");


  socket.on('disconnect', () => {
    console.log("user disconnected");
  });

  socket.on('message', (message) => {
    io.emit('message', message);
  });

});



server.listen(PORT, () => {
  console.log(`Server started on Port: ${PORT}`);
});
