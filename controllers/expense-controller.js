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
        "profile.name as profile_name",
        "expense.id as expense_id",
        "expense.single_expense"
      );
    res.status(200).json(expensesProfiles);
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

module.exports = {
  getAllExpensesByPocketId,
  getExpenseByPocketId,
  getExpensesProfiles,
  addExpense,
  addExpenseProfile,
};
