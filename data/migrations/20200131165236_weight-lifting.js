
exports.up = function (knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl.string("username", 128)
      .notNullable()
      .unique();
    tbl.string("password", 128)
      .notNullable();
  })
    .createTable("exercises", tbl => {
      tbl.increments();
      tbl.integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.string("date")
        .notNullable();
      tbl.string("name", 128)
        .notNullable();
      tbl.string("body_region", 150)
        .notNullable();
      tbl.integer("weight")
        .notNullable();
      tbl.integer("reps")
        .notNullable();
      tbl.integer("sets")
        .notNullable();
      tbl.string("journal", 300)
      .notNullable();
    })
};

exports.down = function (knex) {
  return knex.schema
  .dropTableIfExists("exercises")
  .dropTableIfExists("users");
};
