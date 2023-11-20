/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("category").del();
  await knex("category").insert([
    { id: 1, name: "uber" },
    { id: 2, name: "drinks" },
    { id: 3, name: "food" },
    { id: 4, name: "activities" },
    { id: 5, name: "accommodation" },
  ]);
};
