/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("pockets").del();
  await knex("pockets").insert([
    {
      id: 1,
      name: "Vegas 23",
      notes: "summer trip with the homies",
    },
    {
      id: 2,
      name: "NYC 22",
      notes: "xmas girls trip!",
    },
  ]);
};
