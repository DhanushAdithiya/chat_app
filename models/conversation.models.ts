import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;

const conversationSchema = new schema(
	{
		users: [{type: Schema.Types.ObjectId, ref: "Users"}],
		messages: { type: [String] },
	}
)

const Conversations = mongoose.model("Conversations", conversationSchema);
module.exports = Conversations;
