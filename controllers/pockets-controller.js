const knex = require("knex")(require("../knexfile"));

const getAllPockets = async (req, res) => {
  try {
    const profile_id = req.profile_id;

    const pockets = await knex("pockets")
      .join("pockets_profile", "pockets.id", "=", "pockets_profile.pocket_id")
      .where("pockets_profile.profile_id", profile_id)
      .select("pockets.*");

    res.status(200).json(pockets);
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

const deletePocket = async (req, res) => {
  const { pocketId } = req.params;

  try {
    await knex("expense").where({ pocket_id: pocketId }).del();
    await knex("pockets_profile").where({ pocket_id: pocketId }).del();
    const result = await knex("pockets").where({ id: pocketId }).del();

    if (result === 0) {
      return res
        .status(404)
        .json({ message: `Pocket item with ID ${pocketId} not found` });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete Pocket item: ${error}`,
    });
  }
};

module.exports = {
  getAllPockets,
  getPocket,
  addPocket,
  addPocketProfile,
  deletePocket,
};
