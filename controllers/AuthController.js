const { User } = require("../models/UserModel");

const Signup = async (req, res) => {};

const Signin = async (req, res) => {};

const CheckUser = async (req, res) => {
  const { email } = req.params;
  const findUser = await User.findOne({ email });
  if (!findUser) return res.json({ msg: "User not found", status: false });
  res.status(200).send({ findUser, status: true });
};

module.exports = { Signup, Signin, CheckUser };
