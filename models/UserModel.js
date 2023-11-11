const Joi = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
    },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

const SignupValidation = async (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    about: Joi.string().required().label("About"),
    picture: Joi.string(),
    status: Joi.boolean(),
  });
  return await schema.validateAsync(data);
};
module.exports = { User, SignupValidation };
