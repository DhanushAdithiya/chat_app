//IMPORTS
import dotenv from "dotenv"
import http from "http"
import express from "express"
import mongoose from "mongoose"
import cors from "cors";

// ENV VARIABLES	
dotenv.config();
const PORT = process.env.PORT || 3000;
const DB = process.env.DB || "mongodb://localhost:27017/chat";

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

mongoose.connect(DB)
	.then(() => console.log("DB connected"))
	.catch((e: Error) => {
		console.error("An error occured: ", e);
	});


const loginRouter = require("./routes/user.routes.ts");
app.use("/user", loginRouter);


server.listen(PORT, () => {
	console.log(`Server started on Port: ${PORT}`);
});


