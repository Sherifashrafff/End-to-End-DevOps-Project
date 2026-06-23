/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  await knex.schema.createTable("users", (t) => {
    t.uuid("id").primary();
    t.string("email", 254).notNullable().unique();
    t.string("password_hash", 72).notNullable();
    t.string("full_name", 120).notNullable();
    t.enu("role", ["member", "admin"]).notNullable().defaultTo("member");
    t.timestamps(true, true); // created_at, updated_at with defaults
  });

  await knex.schema.raw('CREATE INDEX idx_users_email ON users (lower(email))');
};

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users");
};
