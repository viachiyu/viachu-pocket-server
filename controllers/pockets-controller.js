const knex = require("knex")(require("../knexfile"));

const getAllPockets = async (req, res) => {
  try {
    const data = await knex("pockets");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving pockets: ${err}`);
  }
};

const getPocket = async (req, res) => {
  try {
    const pocket = await knex("pockets")
      .where({ id: req.params.pocketId })
      .first();
    if (!pocket) {
      return res.status(404).send({
        message: `Pocket with ID ${req.params.pocketId} not found`,
      });
    }
    res.status(200).send(pocket);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Unable to retrieve pocket data with ID ${req.params.pocketId}`,
    });
  }
};

module.exports = {
  getAllPockets,
  getPocket,
};
