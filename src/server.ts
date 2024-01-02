//IMPORTS
import dotenv from "dotenv";
import http from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/roomHandler.js", (req, res) => {
  res.set("Content-Type", "application/javascript"); // Set the MIME type explicitly
  res.sendFile(__dirname + "/Rooms/roomHandler.js");
});

import loginRouter from "./routes/user.routes.js";
import roomRouter from "./routes/rooms.routes.js";

app.use("/user", loginRouter);
app.use("/", roomRouter);

server.listen(PORT, () => {
  console.log(`Server started on Port: ${PORT}`);
});
