const { MessageValidation, Message } = require("../models/MessageModel");
const { StatusError } = require("../utils/StatusError");

const addMessages = async (req, res) => {
  const body = req.body;

  try {
    const { error } = await MessageValidation(body);
    if (error) throw StatusError(error.message, 400);

    const getUser = onlineUsers.get(body.receiver);
    const newMessage = new Message({
      ...body,
      messageStatus: getUser ? "delivered" : "sent",
    });

    await newMessage.save();
    res.status(200).send(newMessage);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getMessages = async (req, res) => {
  const { from, to } = req.params;
  try {
    if (!from || !to) throw StatusError("Require params not found", 400);

    const messages = await Message.find({
      $or: [
        { sender: from, receiver: to },
        { receiver: to, sender: from },
      ],
    }).sort({ timestamp: 1 }); // Sort by timestamp in ascending order

    if (!messages || messages.length === 0)
      throw StatusError("There is no message found", 404);

    await Message.updateMany(
      { sender: to, receiver: from, messageStatus: { $ne: "read" } },
      { $set: { messageStatus: "read" } }
    );
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { addMessages, getMessages };
