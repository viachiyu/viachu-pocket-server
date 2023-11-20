/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("profile").del();
  await knex("profile").insert([
    {
      id: 1,
      name: "Lia",
      email: "lia@gmail.com",
      password: "lialia",
      payment_info: "lia@gmail.com",
      total_owed: 798,
      total_debt: 380,
    },
    {
      id: 2,
      name: "Mark",
      email: "mark@gmail.com",
      password: "mcsteamy",
      payment_info: "mark@gmail.com",
      total_owed: 240,
      total_debt: 240,
    },
    {
      id: 3,
      name: "Hailey",
      email: "hailey@gmail.com",
      password: "haileyhailey",
      payment_info: "hailey@gmail.com",
      total_owed: 0,
      total_debt: 300,
    },
    {
      id: 4,
      name: "Derek",
      email: "derek@gmail.com",
      password: "mcdreamy",
      payment_info: "derek@gmail.com",
      total_owed: 22,
      total_debt: 118,
    },
    {
      id: 5,
      name: "Meredith",
      email: "meredith@gmail.com",
      password: "meredithgrey",
      payment_info: "meredith@gmail.com",
      total_owed: 0,
      total_debt: 362,
    },
    {
      id: 6,
      name: "Christina",
      email: "christina@gmail.com",
      password: "christinayang",
      payment_info: "christina@gmail.com",
      total_owed: 0,
      total_debt: 340,
    },
    {
      id: 7,
      name: "Gloria",
      email: "gloria@gmail.com",
      password: "gloriagloria",
      payment_info: "gloria@gmail.com",
      total_owed: 0,
      total_debt: 300,
    },
    {
      id: 8,
      name: "Lily",
      email: "lily@gmail.com",
      password: "lilylily",
      payment_info: "lily@gmail.com",
      total_owed: 900,
      total_debt: 0,
    },
  ]);
};
