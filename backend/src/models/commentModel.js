const db = require("../config/db");

const TABLE = "comments";

async function findById(id) {
  return db(TABLE).where({ id }).first();
}

async function listForTask({ taskId, page, limit }) {
  const offset = (page - 1) * limit;

  const query = db(TABLE)
    .where(`${TABLE}.task_id`, taskId)
    .join("users", "users.id", `${TABLE}.author_id`)
    .select(
      `${TABLE}.*`,
      "users.full_name as author_name",
      "users.email as author_email"
    )
    .orderBy(`${TABLE}.created_at`, "asc")
    .limit(limit)
    .offset(offset);

  const [rows, [{ count }]] = await Promise.all([
    query,
    db(TABLE).where({ task_id: taskId }).count("* as count"),
  ]);
  return { rows, total: parseInt(count, 10) };
}

async function create({ id, task_id, author_id, body }) {
  const [row] = await db(TABLE).insert({ id, task_id, author_id, body }).returning("*");
  return row;
}

async function update(id, body) {
  const [row] = await db(TABLE)
    .where({ id })
    .update({ body, updated_at: db.fn.now() })
    .returning("*");
  return row;
}

async function remove(id) {
  return db(TABLE).where({ id }).delete();
}

module.exports = { findById, listForTask, create, update, remove };
