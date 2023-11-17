const express = require("express");
const router = express.Router();

router.use("/auth", require("./Auth"));
router.use("/messages",require("./MessagesRoutes"))

module.exports = router;
