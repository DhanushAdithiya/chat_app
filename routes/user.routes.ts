import { Router }  from "express";
import JWT from "jsonwebtoken";
const Users = require("../models/user.models.ts");


const router = Router();
const JSON_KEY:string | undefined = process.env.JSON_KEY;
if (!JSON_KEY) {
	throw new Error("Secret key is not provied please add it to the env variables");
}



router.route("/add").post(async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new Users({ username, email, password });

    if (await newUser.save()) {
      res.status(200).json("Sucesfully Added");
    }
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/").post(async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username, password });

  if (user) {
    const encryptedCred = JWT.sign(
      {
        username: user.username,
        id: user._id,
        password: password,
      },
			JSON_KEY
    );
    res.status(200).json({ encryptedCred });
  } else {
    res.status(404).json("User Not Found");
  }
});

module.exports = router;
