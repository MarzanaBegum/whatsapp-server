const Joi = require("joi");
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: { type: String, default: "text" },
  messageStatus: {
    type: String,
    default: "sent",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

const MessageValidation = async (data) => {
  const schema = Joi.object({
    sender: Joi.string().required(),
    receiver: Joi.string().required(),
    message: Joi.string().required(),
    type: Joi.string(),
    messageStatus: Joi.string(),
    date: Joi.date(),
  });
  return await schema.validateAsync(data);
};

module.exports = { Message, MessageValidation };
