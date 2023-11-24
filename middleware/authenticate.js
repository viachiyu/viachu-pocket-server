const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  console.log(req.body);
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
    req.profile_id = decodedToken.id;

    const profile = await knex("profile").where({ id: req.profile_id }).first();
    delete profile.password;
    req.user_profile = profile;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid auth token");
  }
};

module.exports = authenticate;
