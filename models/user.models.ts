import mongoose from "mongoose";
const schema =  mongoose.Schema;

const userSchema = new schema(
	{ 
		username: { type: String, required: true , unique: true},
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true }
	}
)

const Users = mongoose.model("Users", userSchema);
module.exports = Users;

