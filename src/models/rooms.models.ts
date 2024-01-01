import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;

const roomSchema = new schema(
	{
		title: {type: String, required: true},
		id: {type: Number, requird: true},
		owner: {type: String, required: true},
		users: [{type: Schema.Types.ObjectId, ref: "Users"}],
		messages: [{ type: Schema.Types.ObjectId, ref: "Messages"	}],
	}
)

const Room = mongoose.model("Room", roomSchema);

export default Room;
