/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// this was also done for profile + pockets tables
exports.up = function (knex) {
  return knex.schema
    .table("pockets_profile", function (table) {
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .table("category", function (table) {
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .table("expense", function (table) {
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .table("expense_profile", function (table) {
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .table("pockets_profile", function (table) {
      table.dropColumn("created_at");
      table.dropColumn("updated_at");
    })
    .table("category", function (table) {
      table.dropColumn("created_at");
      table.dropColumn("updated_at");
    })
    .table("expense", function (table) {
      table.dropColumn("created_at");
      table.dropColumn("updated_at");
    })
    .table("expense_profile", function (table) {
      table.dropColumn("created_at");
      table.dropColumn("updated_at");
    });
};
