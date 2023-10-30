const router = require("express").Router();

const { signup, signin } = require("../controllers/AuthController");

router.post("/signup", signup);

router.post("/login", signin);

module.exports = router;
