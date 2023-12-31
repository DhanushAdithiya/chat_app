import mongoose from "mongoose";

const schema = mongoose.Schema;
const messagesSchema = new schema(
	{
		message: { type: String, required: true },
		sender: { type: mongoose.Schema.ObjectId, ref:"Users", required: true },
		timestamp: { type: Date, default: Date.now() },
	}
)

const Messages = mongoose.model("Messages", messagesSchema);
module.exports = Messages;
