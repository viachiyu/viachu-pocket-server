/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("pockets_profile").del();
  await knex("pockets_profile").insert([
    { pocket_id: 1, profile_id: 1 },
    { pocket_id: 1, profile_id: 2 },
    { pocket_id: 1, profile_id: 4 },
    { pocket_id: 1, profile_id: 5 },
    { pocket_id: 1, profile_id: 6 },
    { pocket_id: 2, profile_id: 1 },
    { pocket_id: 2, profile_id: 3 },
    { pocket_id: 2, profile_id: 7 },
    { pocket_id: 2, profile_id: 8 },
  ]);
};
