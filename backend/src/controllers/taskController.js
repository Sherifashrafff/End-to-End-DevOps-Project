const { v4: uuidv4 } = require("uuid");
const taskModel = require("../models/taskModel");
const projectModel = require("../models/projectModel");
const { AppError } = require("../middleware/errorHandler");

function paginate(total, page, limit) {
  return { total, page, limit, pages: Math.ceil(total / limit) };
}

async function assertProjectMember(projectId, userId, next) {
  const project = await projectModel.findById(projectId);
  if (!project) { next(new AppError("Project not found", 404)); return null; }
  const member = await projectModel.getMember(projectId, userId);
  if (!member) { next(new AppError("Not a member of this project", 403)); return null; }
  return { project, member };
}

async function listTasks(req, res, next) {
  try {
    const ctx = await assertProjectMember(req.params.projectId, req.user.id, next);
    if (!ctx) return;

    const { status, priority, assignee_id, page, limit } = req.query;
    const { rows, total } = await taskModel.listForProject({
      projectId: req.params.projectId,
      status,
      priority,
      assignee_id,
      page,
      limit,
    });
    res.status(200).json({
      status: "success",
      pagination: paginate(total, page, limit),
      data: { tasks: rows },
    });
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const ctx = await assertProjectMember(req.params.projectId, req.user.id, next);
    if (!ctx) return;

    const task = await taskModel.create({
      id: uuidv4(),
      project_id: req.params.projectId,
      created_by: req.user.id,
      ...req.body,
    });
    res.status(201).json({ status: "success", data: { task } });
  } catch (err) {
    next(err);
  }
}

async function getTask(req, res, next) {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) return next(new AppError("Task not found", 404));

    const ctx = await assertProjectMember(task.project_id, req.user.id, next);
    if (!ctx) return;

    res.status(200).json({ status: "success", data: { task } });
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) return next(new AppError("Task not found", 404));

    const ctx = await assertProjectMember(task.project_id, req.user.id, next);
    if (!ctx) return;

    const updated = await taskModel.update(task.id, req.body);
    res.status(200).json({ status: "success", data: { task: updated } });
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) return next(new AppError("Task not found", 404));

    const ctx = await assertProjectMember(task.project_id, req.user.id, next);
    if (!ctx) return;

    // Only task creator or project owner can delete
    if (task.created_by !== req.user.id && ctx.member.role !== "owner") {
      return next(new AppError("Not authorised to delete this task", 403));
    }

    await taskModel.remove(task.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listTasks, createTask, getTask, updateTask, deleteTask };
