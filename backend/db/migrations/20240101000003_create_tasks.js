/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  await knex.schema.createTable("tasks", (t) => {
    t.uuid("id").primary();
    t.uuid("project_id").notNullable().references("id").inTable("projects").onDelete("CASCADE");
    t.uuid("created_by").notNullable().references("id").inTable("users").onDelete("RESTRICT");
    t.uuid("assignee_id").nullable().references("id").inTable("users").onDelete("SET NULL");
    t.string("title", 200).notNullable();
    t.text("description");
    t.enu("status", ["todo", "in_progress", "done"]).notNullable().defaultTo("todo");
    t.enu("priority", ["low", "medium", "high"]).notNullable().defaultTo("medium");
    t.timestamp("due_date").nullable();
    t.timestamps(true, true);
  });

  await knex.schema.raw("CREATE INDEX idx_tasks_project ON tasks (project_id)");
  await knex.schema.raw("CREATE INDEX idx_tasks_assignee ON tasks (assignee_id)");
  await knex.schema.raw("CREATE INDEX idx_tasks_status ON tasks (project_id, status)");
};

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("tasks");
};
