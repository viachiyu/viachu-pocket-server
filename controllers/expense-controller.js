const knex = require("knex")(require("../knexfile"));

const getAllExpensesByPocketId = async (req, res) => {
  const pocketId = req.params.pocketId;
  try {
    const expenseList = await knex("expense")
      .where("pocket_id", pocketId)
      .select("expense.*", "profile.name as profile_name")
      .leftJoin("profile", "expense.profile_id", "profile.id");
    res.status(200).json(expenseList);
  } catch (error) {
    res.status(400).send(`Error retrieving expenses: ${error}`);
  }
};

const getExpensesProfiles = async (req, res) => {
  const pocketId = req.params.pocketId;
  try {
    const expensesProfiles = await knex("expense_profile")
      .join("profile", "expense_profile.profile_id", "profile.id")
      .join("expense", "expense_profile.expense_id", "expense.id")
      .where("expense.pocket_id", pocketId)
      .select(
        "profile.id as profile_id",
        "profile.name as profile_name",
        "expense.id as expense_id",
        "expense.single_expense",
        "expense.profile_id as paid_by"
      );
    res.status(200).json(expensesProfiles);
  } catch (error) {
    res.status(400).send(`Error retrieving expenses profiles: ${error}`);
  }
};

const getExpensesProfilesById = async (req, res) => {
  const expenseId = req.params.expenseId;
  try {
    const expensesProfilesById = await knex("expense_profile").where(
      "expense_id",
      expenseId
    );
    res.status(200).json(expensesProfilesById);
  } catch (error) {
    res.status(400).send(`Error retrieving expenses profiles: ${error}`);
  }
};

const getExpenseByPocketId = async (req, res) => {
  const pocketId = req.params.pocketId;
  const expenseId = req.params.expenseId;
  try {
    const expenseList = await knex("expense")
      .where("pocket_id", pocketId)
      .where("id", expenseId)
      .first();

    res.status(200).json(expenseList);
  } catch (error) {
    res.status(400).send(`Error retrieving inventories: ${error}`);
  }
};

const addExpense = async (req, res) => {
  try {
    const {
      total_expense,
      date,
      name,
      profile_id,
      category_id,
      single_expense,
      pocket_id,
      headcount,
    } = req.body;
    if (!total_expense || !date || !name) {
      return res.status(400).send("Please fill in all fields");
    }

    const [expenseId] = await knex("expense").insert({
      total_expense,
      date,
      name: name,
      profile_id: profile_id,
      category_id: category_id,
      split_even: true,
      single_expense,
      pocket_id,
      headcount,
    });

    res.status(200).send({ ...req.body, id: expenseId });
  } catch (error) {
    res.status(500).send(`Unable to create a new expense: ${error}`);
  }
};

const addExpenseProfile = async (req, res) => {
  try {
    const { expense_id } = req.body;
    const expenseProfileData = req.body;

    await knex("expense_profile").insert(expenseProfileData);
    res.status(200).send({ ...req.body, id: expense_id });
  } catch (error) {
    res.status(500).send(`Unable to add expense to profile(s): ${error}`);
  }
};

const updateExpense = async (req, res) => {
  try {
    if (
      !req.body.id ||
      !req.body.total_expense ||
      !req.body.date ||
      !req.body.name ||
      !req.body.profile_id ||
      !req.body.category_id
    ) {
      return res
        .status(400)
        .send("Please ensure you have provided all information necessary");
    }

    const formattedDate = new Date(req.body.date).toISOString().split("T")[0];
    req.body.date = formattedDate;

    delete req.body.created_at;
    req.body.updated_at = new Date();

    const allExpenses = await knex("expense");
    let matchingExpense = false;
    allExpenses.forEach((expense) => {
      if (expense.id === req.body.id) {
        return (matchingExpense = true);
      }
    });
    if (!matchingExpense) {
      return res
        .status(400)
        .send("The Expense ID provided does not match. Please try again");
    }
    const updatedRecord = await knex("expense")
      .where({ id: req.params.expenseId })
      .update(req.body);
    if (updatedRecord === 0) {
      return res
        .status(404)
        .send(`Expense with ID ${req.params.expenseId} was not found`);
    }
    const updatedExpenses = await knex("expense").where({
      id: req.params.expenseId,
    });
    res.status(200).send(updatedExpenses[0]);
  } catch (err) {
    res
      .status(500)
      .send(`Unable to update Expense with ID ${req.params.id}: ${err}`);
    console.error(err);
  }
};

const updateExpenseProfileofExpenseId = async (req, res) => {
  try {
    const { expenseId } = req.params;
    await knex("expense_profile").where({ expense_id: expenseId }).del();

    const { expense_id } = req.body;
    const expenseProfileData = req.body;

    await knex("expense_profile").insert(expenseProfileData);
    res.status(200).send({ ...req.body, id: expense_id });
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete Expense item: ${error}`,
    });
  }
};

const deleteExpense = async (req, res) => {
  const { expenseId } = req.params;

  try {
    await knex("expense_profile").where({ expense_id: expenseId }).del();
    const result = await knex("expense").where({ id: expenseId }).del();

    if (result === 0) {
      return res
        .status(404)
        .json({ message: `Expense item with ID ${expenseId} not found` });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete Expense item: ${error}`,
    });
  }
};

module.exports = {
  getAllExpensesByPocketId,
  getExpenseByPocketId,
  getExpensesProfiles,
  getExpensesProfilesById,
  addExpense,
  addExpenseProfile,
  updateExpense,
  updateExpenseProfileofExpenseId,
  deleteExpense,
};
