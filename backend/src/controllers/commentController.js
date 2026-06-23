const { v4: uuidv4 } = require("uuid");
const commentModel = require("../models/commentModel");
const taskModel = require("../models/taskModel");
const projectModel = require("../models/projectModel");
const { AppError } = require("../middleware/errorHandler");

function paginate(total, page, limit) {
  return { total, page, limit, pages: Math.ceil(total / limit) };
}

async function assertTaskAccess(taskId, userId, next) {
  const task = await taskModel.findById(taskId);
  if (!task) { next(new AppError("Task not found", 404)); return null; }
  const member = await projectModel.getMember(task.project_id, userId);
  if (!member) { next(new AppError("Not a member of this project", 403)); return null; }
  return { task, member };
}

async function listComments(req, res, next) {
  try {
    const ctx = await assertTaskAccess(req.params.taskId, req.user.id, next);
    if (!ctx) return;

    const { page, limit } = req.query;
    const { rows, total } = await commentModel.listForTask({ taskId: req.params.taskId, page, limit });
    res.status(200).json({
      status: "success",
      pagination: paginate(total, page, limit),
      data: { comments: rows },
    });
  } catch (err) {
    next(err);
  }
}

async function createComment(req, res, next) {
  try {
    const ctx = await assertTaskAccess(req.params.taskId, req.user.id, next);
    if (!ctx) return;

    const comment = await commentModel.create({
      id: uuidv4(),
      task_id: req.params.taskId,
      author_id: req.user.id,
      body: req.body.body,
    });
    res.status(201).json({ status: "success", data: { comment } });
  } catch (err) {
    next(err);
  }
}

async function updateComment(req, res, next) {
  try {
    const comment = await commentModel.findById(req.params.id);
    if (!comment) return next(new AppError("Comment not found", 404));

    if (comment.author_id !== req.user.id) {
      return next(new AppError("You can only edit your own comments", 403));
    }

    const updated = await commentModel.update(comment.id, req.body.body);
    res.status(200).json({ status: "success", data: { comment: updated } });
  } catch (err) {
    next(err);
  }
}

async function deleteComment(req, res, next) {
  try {
    const comment = await commentModel.findById(req.params.id);
    if (!comment) return next(new AppError("Comment not found", 404));

    const ctx = await assertTaskAccess(comment.task_id, req.user.id, next);
    if (!ctx) return;

    if (comment.author_id !== req.user.id && ctx.member.role !== "owner") {
      return next(new AppError("Not authorised to delete this comment", 403));
    }

    await commentModel.remove(comment.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listComments, createComment, updateComment, deleteComment };
