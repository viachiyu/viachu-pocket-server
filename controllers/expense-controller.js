const knex = require("knex")(require("../knexfile"));

const getAllExpensesByPocketId = async (req, res) => {
  const pocketId = req.params.pocketId;
  try {
    const expenseList = await knex("expense")
      .where("pocket_id", pocketId)
      .select("*");

    res.status(200).json(expenseList);
  } catch (error) {
    res.status(400).send(`Error retrieving inventories: ${error}`);
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

module.exports = {
  getAllExpensesByPocketId,
  getExpenseByPocketId,
};
