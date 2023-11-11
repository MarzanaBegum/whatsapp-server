const router = require("express").Router();
const { HandleOnboardUser,CheckUser } = require("../controllers/AuthController");

//onboard user
router.post("/onboard-user", HandleOnboardUser);

//check user 
router.get("/user:email",CheckUser)

module.exports = router;
