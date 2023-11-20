/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("expense", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.date("date").notNullable();
    table.integer("total_expense").notNullable();
    table.boolean("split_even").defaultTo(false);
    table.integer("headcount").notNullable();
    table.integer("single_expense").notNullable();
    table
      .integer("profile_id")
      .unsigned()
      .references("profile.id")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
    table
      .integer("pocket_id")
      .unsigned()
      .references("pockets.id")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
    table
      .integer("category_id")
      .unsigned()
      .references("category.id")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("expense");
};
