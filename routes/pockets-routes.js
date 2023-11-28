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

router.route("/pocket_profile").post(pocketsController.addPocketProfile);

router.route("/profiles").get(profileController.getAllProfiles);

router
  .route("/:pocketId")
  .get(pocketsController.getPocket)
  .post(pocketsController.addPocketProfile)
  .delete(pocketsController.deletePocket);

router
  .route("/:pocketId/profiles")
  .get(profileController.getAllProfilesByPocketId);

router
  .route("/:pocketId/loggedInProfile")
  .get(profileController.getLoggedInUserProfile);

router
  .route("/:pocketId/profiles/:profileId")
  .get(profileController.getProfileByIdOfPocketId);

router
  .route("/:pocketId/expenses")
  .get(expenseController.getAllExpensesByPocketId);

router.route("/:pocketId/expenses/add").post(expenseController.addExpense);

router
  .route("/:pocketId/expense_profile/add")
  .post(expenseController.addExpenseProfile);

router
  .route("/:pocketId/expensesprofiles")
  .get(expenseController.getExpensesProfiles);

router
  .route("/:pocketId/expensesprofiles/:expenseId")
  .get(expenseController.getExpensesProfilesById)
  .put(expenseController.updateExpenseProfileofExpenseId);

router
  .route("/:pocketId/expenses/:expenseId")
  .get(expenseController.getExpenseByPocketId)
  .put(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;
