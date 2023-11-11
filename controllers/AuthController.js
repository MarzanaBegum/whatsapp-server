const { User, SignupValidation } = require("../models/UserModel");
const { EncryptData } = require("../utils/EncryptData");
const { StatusError } = require("../utils/StatusError");

const HandleOnboardUser = async (req, res) => {
  const body = req.body;
  try {
    const { error } = await SignupValidation(body);
    if (error) throw StatusError(error.message, 400);

    const user = await User.findOne({ email: body.email });
    if (user) throw StatusError("User already exists", 400);

    const newUser = new User(body);
    await newUser.save();

    //token
    const token = EncryptData({ id: newUser._id });
    res.status(200).send({ token, newUser });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const CheckUser = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email)
      return res
        .status(422)
        .send({ message: "Required email is not provided" });
    const findUser = await User.findOne({ email });
    if (!findUser) return res.json({ message: "User not found" });
    res.status(200).send(findUser);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { HandleOnboardUser, CheckUser };
