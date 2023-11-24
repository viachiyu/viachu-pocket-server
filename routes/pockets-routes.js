const router = require("express").Router();
const pocketsController = require("../controllers/pockets-controller");
const profileController = require("../controllers/profile-controller");
const expenseController = require("../controllers/expense-controller");
const authenticate = require("../middleware/authenticate");

router.use(authenticate);

router
  .route("/")
  .get(pocketsController.getAllPockets)
  .post(pocketsController.addPocket);

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
  .route("/:pocketId/expensesprofiles")
  .get(expenseController.getExpensesProfiles);

router
  .route("/:pocketId/expenses/:expenseId")
  .get(expenseController.getExpenseByPocketId);

module.exports = router;
