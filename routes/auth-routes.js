const router = require("express").Router();
const authController = require("../controllers/auth-controller");

router.route("/register").post(authController.addProfile);
router.route("/login").post(authController.profileLogIn);

module.exports = router;
