import { Router } from "express";
import Rooms from "../models/rooms.models.js";
import path from "path";

const router = Router();

interface Room {
  title: string;
  owner: string;
  id: number;
}

router.post("/create-room", async (req, res) => {
  try {
    const roomDetails: Room = req.body;
    const room = new Rooms({
      title: roomDetails.title,
      owner: roomDetails.owner,
      id: roomDetails.id,
    });

    if (await room.save()) {
      res.status(200).json("Created a new room!");
    }
  } catch (err: any) {
    res.status(400).json("Could not create a room:" + err);
  }
});

router.get("/room/:id", async (req, res) => {
  const roomId: number = Number(req.params.id);
  try {
    const room = await Rooms.findOne({ id: roomId });
    if (room) {
      res.status(200).json(
        room.title,
      );
    } else {
      res
        .status(404).json("Could not find the room you were looking for");
    }
  } catch (err) {
    res.status(400).json("Error occured:" + err);
  }
});

export default router;
