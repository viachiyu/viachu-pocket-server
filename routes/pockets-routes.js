const router = require("express").Router();
const pocketsController = require("../controllers/pockets-controller");

router.route("/").get(pocketsController.getAllPockets);
router.route("/:id").get(pocketsController.getPocket);

module.exports = router;
