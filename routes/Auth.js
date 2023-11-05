const router = require("express").Router();

const { Signup, Signin, CheckUser } = require("../controllers/AuthController");

router.post("/signup", Signup);

router.post("/login", Signin);

//check user 
router.get("/user/:email",CheckUser)

module.exports = router;
