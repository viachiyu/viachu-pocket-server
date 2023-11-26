/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("category").del();
  await knex("category").insert([
    { id: 1, name: "Transport" },
    { id: 2, name: "Drinks" },
    { id: 3, name: "Food" },
    { id: 4, name: "Activities" },
    { id: 5, name: "Accommodation" },
  ]);
};
