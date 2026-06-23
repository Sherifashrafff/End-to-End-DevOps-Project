const db = require("../config/db");

const TABLE = "tasks";

async function findById(id) {
  return db(TABLE)
    .where(`${TABLE}.id`, id)
    .join("users as creator", "creator.id", `${TABLE}.created_by`)
    .leftJoin("users as assignee", "assignee.id", `${TABLE}.assignee_id`)
    .select(
      `${TABLE}.*`,
      "creator.full_name as creator_name",
      "creator.email as creator_email",
      "assignee.full_name as assignee_name",
      "assignee.email as assignee_email"
    )
    .first();
}

async function listForProject({ projectId, status, priority, assignee_id, page, limit }) {
  const offset = (page - 1) * limit;

  const query = db(TABLE)
    .where(`${TABLE}.project_id`, projectId)
    .leftJoin("users as assignee", "assignee.id", `${TABLE}.assignee_id`)
    .select(
      `${TABLE}.*`,
      "assignee.full_name as assignee_name",
      "assignee.email as assignee_email"
    )
    .orderBy(`${TABLE}.created_at`, "desc")
    .limit(limit)
    .offset(offset);

  if (status) query.where(`${TABLE}.status`, status);
  if (priority) query.where(`${TABLE}.priority`, priority);
  if (assignee_id) query.where(`${TABLE}.assignee_id`, assignee_id);

  const countQuery = db(TABLE).where({ project_id: projectId });
  if (status) countQuery.where({ status });
  if (priority) countQuery.where({ priority });
  if (assignee_id) countQuery.where({ assignee_id });

  const [rows, [{ count }]] = await Promise.all([query, countQuery.count("* as count")]);
  return { rows, total: parseInt(count, 10) };
}

async function create({ id, project_id, created_by, title, description, status, priority, assignee_id, due_date }) {
  const [row] = await db(TABLE)
    .insert({ id, project_id, created_by, title, description, status, priority, assignee_id, due_date })
    .returning("*");
  return row;
}

async function update(id, fields) {
  const [row] = await db(TABLE)
    .where({ id })
    .update({ ...fields, updated_at: db.fn.now() })
    .returning("*");
  return row;
}

async function remove(id) {
  return db(TABLE).where({ id }).delete();
}

module.exports = { findById, listForProject, create, update, remove };
