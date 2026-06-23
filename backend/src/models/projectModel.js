const db = require("../config/db");

const PROJECTS = "projects";
const MEMBERS = "project_members";

async function findById(id) {
  return db(PROJECTS).where({ id }).first();
}

// Returns projects where the caller is a member (owner or regular member)
async function listForUser({ userId, status, page, limit }) {
  const offset = (page - 1) * limit;

  const query = db(PROJECTS)
    .join(MEMBERS, `${PROJECTS}.id`, `${MEMBERS}.project_id`)
    .where(`${MEMBERS}.user_id`, userId)
    .select(
      `${PROJECTS}.*`,
      `${MEMBERS}.role as member_role`
    )
    .orderBy(`${PROJECTS}.created_at`, "desc")
    .limit(limit)
    .offset(offset);

  if (status) query.where(`${PROJECTS}.status`, status);

  const countQuery = db(PROJECTS)
    .join(MEMBERS, `${PROJECTS}.id`, `${MEMBERS}.project_id`)
    .where(`${MEMBERS}.user_id`, userId);

  if (status) countQuery.where(`${PROJECTS}.status`, status);

  const [rows, [{ count }]] = await Promise.all([query, countQuery.count("* as count")]);
  return { rows, total: parseInt(count, 10) };
}

async function create({ id, name, description, status, owner_id }) {
  return db.transaction(async (trx) => {
    const [project] = await trx(PROJECTS)
      .insert({ id, name, description, status, owner_id })
      .returning("*");

    await trx(MEMBERS).insert({
      project_id: project.id,
      user_id: owner_id,
      role: "owner",
    });

    return project;
  });
}

async function update(id, fields) {
  const [row] = await db(PROJECTS)
    .where({ id })
    .update({ ...fields, updated_at: db.fn.now() })
    .returning("*");
  return row;
}

async function remove(id) {
  return db(PROJECTS).where({ id }).delete();
}

// Members
async function getMembers(projectId) {
  return db(MEMBERS)
    .join("users", "users.id", `${MEMBERS}.user_id`)
    .where({ project_id: projectId })
    .select(
      "users.id",
      "users.email",
      "users.full_name",
      `${MEMBERS}.role as member_role`,
      `${MEMBERS}.joined_at`
    );
}

async function getMember(projectId, userId) {
  return db(MEMBERS).where({ project_id: projectId, user_id: userId }).first();
}

async function addMember({ project_id, user_id, role }) {
  const [row] = await db(MEMBERS).insert({ project_id, user_id, role }).returning("*");
  return row;
}

async function removeMember(projectId, userId) {
  return db(MEMBERS).where({ project_id: projectId, user_id: userId }).delete();
}

module.exports = {
  findById,
  listForUser,
  create,
  update,
  remove,
  getMembers,
  getMember,
  addMember,
  removeMember,
};
