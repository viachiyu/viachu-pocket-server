const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");

const getAllProfilesByPocketId = async (req, res) => {
  const pocketId = req.params.pocketId;
  try {
    const profileIds = await knex("pockets_profile")
      .where("pocket_id", pocketId)
      .select("profile_id");

    const profiles = await knex("profile")
      .whereIn(
        "id",
        profileIds.map((profile) => profile.profile_id)
      )
      .select("*");
    return res.status(200).json(profiles);
  } catch (err) {
    return res.status(400).send(`Error retrieving profiles: ${err}`);
  }
};

const getProfileByIdOfPocketId = async (req, res) => {
  const pocketId = req.params.pocketId;
  const profileId = req.params.profileId;

  try {
    const selectProfileId = await knex("pockets_profile")
      .where("pocket_id", pocketId)
      .where("profile_id", profileId)
      .select("profile_id")
      .first();
    console.log(selectProfileId);

    const profile = await knex("profile").where(
      "id",
      selectProfileId.profile_id
    );

    if (profile) {
      res.status(200).json(profile);
    } else {
      res
        .status(404)
        .send(
          `Profile with ID ${profileId} not found in the pocket with ID ${pocketId}`
        );
    }
  } catch (err) {
    res.status(400).send(`Error retrieving profile: ${err}`);
  }
};

const addProfile = async (req, res) => {
  try {
    if (!req.body.email || !req.body.name || !req.body.password) {
      return res
        .status(400)
        .send("Please ensure you have provided all information necessary");
    }
    const hashedPassword = bcrypt.hashSync(req.body.password);
    const newProfile = {
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      payment_info: req.body.payment_info,
    };

    const result = await knex("profile").insert(newProfile);
    const createdProfile = await knex("profile")
      .where({ id: result[0] })
      .first();
    res.status(201).send(createdProfile);
  } catch (err) {
    res.status(500).send(`Unable to create new profile: ${err}`);
  }
};

module.exports = {
  getAllProfilesByPocketId,
  getProfileByIdOfPocketId,
  addProfile,
};
