const router = require("express").Router();
const pocketsController = require("../controllers/pockets-controller");
const profileController = require("../controllers/profile-controller");
const expenseController = require("../controllers/expense-controller");

router.route("/").get(pocketsController.getAllPockets);

router.route("/:pocketId").get(pocketsController.getPocket);

router
  .route("/:pocketId/profiles")
  .get(profileController.getAllProfilesByPocketId);

router
  .route("/:pocketId/profiles/:profileId")
  .get(profileController.getProfileByIdOfPocketId);

router
  .route("/:pocketId/expenses")
  .get(expenseController.getAllExpensesByPocketId);

router
  .route("/:pocketId/expenses/:expenseId")
  .get(expenseController.getExpenseByPocketId);
module.exports = router;
