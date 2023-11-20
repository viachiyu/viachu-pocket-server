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

// const addExpense = async (req, res) => {
//   try {
//     if (
//       !req.body.name ||
//       !req.body.date ||
//       !req.body.total ||
//       !req.body.headcount ||
//       !req.body.category ||
//       !req.body.profile_id
//     ) {
//       return res.status(400).send("Please fill in all fields");
//     }
//     const newExpense = {
//       name: req.body.name,
//       date: req.body.date,
//       total_expense: req.body.total,
//       headcount: ,
//     };
//     const result = await knex("expense").insert(newExpense);
//     const createdExpense = await knex("expense")
//       .where({ id: result[0] })
//       .first();
//     res.status(201).send(createdExpense);
//   } catch (err) {
//     res.status(500).send(`Unable to create a new expense: ${err}`);
//   }
// };

module.exports = {
  getAllExpensesByPocketId,
  getExpenseByPocketId,
};
