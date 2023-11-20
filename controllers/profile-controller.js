const knex = require("knex")(require("../knexfile"));

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

module.exports = {
  getAllProfilesByPocketId,
  getProfileByIdOfPocketId,
};
