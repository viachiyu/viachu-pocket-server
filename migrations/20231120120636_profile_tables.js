/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("profile", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable();
    table.string("name").notNullable();
    table.string("password").notNullable();
    table.string("colour");
    table.string("payment_info");
    table.integer("total_owed");
    table.integer("total_debt");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("profile");
};
