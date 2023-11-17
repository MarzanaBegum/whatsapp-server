const {
  addMessages,
  getMessages,
} = require("../controllers/MessageController");

const router = require("express").Router();

//add messages
router.post("/add-message", addMessages);

//get messages
router.get("/get-message/:from/:to", getMessages);

module.exports = router;
