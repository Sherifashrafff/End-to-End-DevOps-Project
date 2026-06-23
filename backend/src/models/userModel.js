const db = require("../config/db");

const TABLE = "users";

// Never select password_hash except when explicitly needed for auth
const PUBLIC_COLS = ["id", "email", "full_name", "role", "created_at", "updated_at"];

async function findById(id) {
  return db(TABLE).where({ id }).select(PUBLIC_COLS).first();
}

async function findByEmail(email) {
  // Returns password_hash — callers must NOT expose this in responses
  return db(TABLE).where({ email }).first();
}

async function create({ id, email, password_hash, full_name, role = "member" }) {
  const [row] = await db(TABLE)
    .insert({ id, email, password_hash, full_name, role })
    .returning(PUBLIC_COLS);
  return row;
}

async function update(id, fields) {
  const [row] = await db(TABLE)
    .where({ id })
    .update({ ...fields, updated_at: db.fn.now() })
    .returning(PUBLIC_COLS);
  return row;
}

module.exports = { findById, findByEmail, create, update };
