const router = require("express").Router();
const { HandleOnboardUser,CheckUser, GetAllUsers } = require("../controllers/AuthController");

//onboard user
router.post("/onboard-user", HandleOnboardUser);

//check user 
router.get("/user:email",CheckUser)

//get all users
router.get("/get-contacts",GetAllUsers)

module.exports = router;
