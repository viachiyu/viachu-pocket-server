const knex = require("knex")(require("../knexfile"));

const getAllCategories = async (req, res) => {
  try {
    const data = await knex("category");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving categories: ${err}`);
  }
};

module.exports = {
  getAllCategories,
};
