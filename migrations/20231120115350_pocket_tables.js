/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("pockets", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
    })
    .createTable("pockets_profile", (table) => {
      table
        .integer("pocket_id")
        .unsigned()
        .references("pockets.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("profile_id").unsigned().notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("pockets").dropTable("pockets_profile");
};
