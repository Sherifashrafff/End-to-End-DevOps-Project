/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  await knex.schema.createTable("projects", (t) => {
    t.uuid("id").primary();
    t.string("name", 120).notNullable();
    t.text("description");
    t.uuid("owner_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    t.enu("status", ["active", "archived"]).notNullable().defaultTo("active");
    t.timestamps(true, true);
  });

  await knex.schema.createTable("project_members", (t) => {
    t.uuid("project_id").notNullable().references("id").inTable("projects").onDelete("CASCADE");
    t.uuid("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    t.enu("role", ["owner", "member"]).notNullable().defaultTo("member");
    t.timestamp("joined_at").notNullable().defaultTo(knex.fn.now());
    t.primary(["project_id", "user_id"]);
  });

  await knex.schema.raw("CREATE INDEX idx_projects_owner ON projects (owner_id)");
  await knex.schema.raw("CREATE INDEX idx_project_members_user ON project_members (user_id)");
};

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("project_members");
  await knex.schema.dropTableIfExists("projects");
};
