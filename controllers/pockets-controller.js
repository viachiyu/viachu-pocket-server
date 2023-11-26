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

const addPocket = async (req, res) => {
  try {
    if (!req.body.name || !req.body.notes) {
      return res.status(400).send("Please fill in all fields");
    }
    const newPocket = {
      name: req.body.name,
      notes: req.body.notes,
    };
    const result = await knex("pockets").insert(newPocket);
    const createdPocket = await knex("pockets")
      .where({ id: result[0] })
      .first();
    res.status(201).send(createdPocket);
  } catch (err) {
    res.status(500).send(`Unable to create a new pocket: ${err}`);
  }
};

const addPocketProfile = async (req, res) => {
  try {
    const { pocket_id, profile_id } = req.body;

    const result = await knex("pockets_profile").insert({
      pocket_id,
      profile_id,
    });

    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Unable to associate pocket with profile: ${err}`);
  }
};

module.exports = {
  getAllPockets,
  getPocket,
  addPocket,
  addPocketProfile,
};
