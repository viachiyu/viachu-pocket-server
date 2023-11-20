/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("expense_profile").del();
  await knex("expense_profile").insert([
    { expense_id: 1, profile_id: 1 },
    { expense_id: 1, profile_id: 2 },
    { expense_id: 1, profile_id: 4 },
    { expense_id: 1, profile_id: 5 },
    { expense_id: 1, profile_id: 6 },

    { expense_id: 2, profile_id: 1 },
    { expense_id: 2, profile_id: 4 },
    { expense_id: 2, profile_id: 5 },
    { expense_id: 2, profile_id: 6 },

    { expense_id: 3, profile_id: 4 },
    { expense_id: 3, profile_id: 5 },

    { expense_id: 4, profile_id: 1 },
    { expense_id: 4, profile_id: 2 },
    { expense_id: 4, profile_id: 5 },
    { expense_id: 4, profile_id: 6 },

    { expense_id: 5, profile_id: 1 },
    { expense_id: 5, profile_id: 2 },
    { expense_id: 5, profile_id: 4 },
    { expense_id: 5, profile_id: 5 },
    { expense_id: 5, profile_id: 6 },

    { expense_id: 6, profile_id: 1 },
    { expense_id: 6, profile_id: 3 },
    { expense_id: 6, profile_id: 7 },
    { expense_id: 6, profile_id: 8 },
  ]);
};
