const router = require("express").Router();
const profileController = require("../controllers/profile-controller");

router.route("/").post(profileController.addProfile);

module.exports = router;
