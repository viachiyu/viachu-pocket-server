const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const profileLogIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).send("Please enter the required fields");
  }
  // Find the user
  // TODO: test if this is case insenstive
  const user = await knex("users").where({ email: email }).first();
  if (!user) {
    return res.status(400).send("Invalid email");
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  // Check the password
  if (!isPasswordCorrect) {
    return res.status(400).send("Invalid password");
  }
  // Generate a token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );

  res.send({ token });
};

module.exports = {
  addProfile,
  profileLogIn,
};
