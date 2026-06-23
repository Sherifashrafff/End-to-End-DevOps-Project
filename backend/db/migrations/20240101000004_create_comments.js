/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  await knex.schema.createTable("comments", (t) => {
    t.uuid("id").primary();
    t.uuid("task_id").notNullable().references("id").inTable("tasks").onDelete("CASCADE");
    t.uuid("author_id").notNullable().references("id").inTable("users").onDelete("RESTRICT");
    t.text("body").notNullable();
    t.timestamps(true, true);
  });

  await knex.schema.raw("CREATE INDEX idx_comments_task ON comments (task_id)");
};

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("comments");
};
