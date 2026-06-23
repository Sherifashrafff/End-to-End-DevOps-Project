const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const adminId = uuidv4();
const aliceId = uuidv4();
const bobId = uuidv4();
const projectId = uuidv4();
const task1Id = uuidv4();
const task2Id = uuidv4();
const task3Id = uuidv4();
const comment1Id = uuidv4();

/** @param {import('knex').Knex} knex */
exports.seed = async (knex) => {
  // Wipe in reverse FK order
  await knex("comments").del();
  await knex("tasks").del();
  await knex("project_members").del();
  await knex("projects").del();
  await knex("users").del();

  const hash = await bcrypt.hash("Password123!", 12);

  await knex("users").insert([
    { id: adminId, email: "admin@taskflow.local", password_hash: hash, full_name: "Admin User", role: "admin" },
    { id: aliceId, email: "alice@taskflow.local", password_hash: hash, full_name: "Alice Smith", role: "member" },
    { id: bobId,   email: "bob@taskflow.local",   password_hash: hash, full_name: "Bob Jones",  role: "member" },
  ]);

  await knex("projects").insert({
    id: projectId,
    name: "TaskFlow Launch",
    description: "Everything needed to ship v1",
    owner_id: aliceId,
    status: "active",
  });

  await knex("project_members").insert([
    { project_id: projectId, user_id: aliceId, role: "owner" },
    { project_id: projectId, user_id: bobId,   role: "member" },
  ]);

  await knex("tasks").insert([
    {
      id: task1Id,
      project_id: projectId,
      created_by: aliceId,
      assignee_id: bobId,
      title: "Set up CI pipeline",
      description: "GitHub Actions: lint, test, build Docker image, push to ECR",
      status: "in_progress",
      priority: "high",
    },
    {
      id: task2Id,
      project_id: projectId,
      created_by: aliceId,
      assignee_id: aliceId,
      title: "Write API documentation",
      description: "OpenAPI 3 spec covering all /api/v1 routes",
      status: "todo",
      priority: "medium",
    },
    {
      id: task3Id,
      project_id: projectId,
      created_by: bobId,
      title: "Add Aurora read replica support",
      description: "Route read queries to the reader endpoint",
      status: "todo",
      priority: "low",
    },
  ]);

  await knex("comments").insert({
    id: comment1Id,
    task_id: task1Id,
    author_id: bobId,
    body: "Started on the GitHub Actions workflow. Build step passing locally.",
  });
};
