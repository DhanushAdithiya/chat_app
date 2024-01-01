import {Router} from "express";
import Rooms from "../models/rooms.models.js";


const router = Router();

interface Room {
	title: string, 
	owner: string,
	id: number,
};

router.post("/create-room", async(req, res) => {
	try {
		const roomDetails: Room = req.body;
		const room = new Rooms(
			{
				title: roomDetails.title,
				owner: roomDetails.owner,
				id: roomDetails.id,
			}
		)

		if (await room.save()) {
			res.status(200).json("Created a new room!");
		}
	} catch (err: any) {
		res.status(400).json("Could not create a room:" + err);
	}
})

export default router;

