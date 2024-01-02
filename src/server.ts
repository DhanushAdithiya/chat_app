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
})


//TODO REFACTOR THIS CODE FOR FETCHING THE JS FILES
app.get("/roomHandler.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(__dirname + "/Rooms/roomHandler.js");
});


app.get("/join-room/manager/roomManager.js", (req, res) => {
  res.set("Content-Type", "application/javascript"); 
  res.sendFile(__dirname + "/Rooms/roomManager.js");
});

import loginRouter from "./routes/user.routes.js";
import roomRouter from "./routes/rooms.routes.js";

app.use("/user", loginRouter);
app.use("/", roomRouter);

server.listen(PORT, () => {
  console.log(`Server started on Port: ${PORT}`);
});
