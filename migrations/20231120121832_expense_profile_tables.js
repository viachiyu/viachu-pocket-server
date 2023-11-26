/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("expense_profile", (table) => {
    table
      .integer("profile_id")
      .unsigned()
      .references("profile.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("expense_id")
      .unsigned()
      .references("expense.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("expense_profile");
};
