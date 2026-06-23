const { v4: uuidv4 } = require("uuid");
const projectModel = require("../models/projectModel");
const { AppError } = require("../middleware/errorHandler");

function paginate(total, page, limit) {
  return { total, page, limit, pages: Math.ceil(total / limit) };
}

async function listProjects(req, res, next) {
  try {
    const { status, page, limit } = req.query;
    const { rows, total } = await projectModel.listForUser({
      userId: req.user.id,
      status,
      page,
      limit,
    });
    res.status(200).json({
      status: "success",
      pagination: paginate(total, page, limit),
      data: { projects: rows },
    });
  } catch (err) {
    next(err);
  }
}

async function createProject(req, res, next) {
  try {
    const project = await projectModel.create({
      id: uuidv4(),
      owner_id: req.user.id,
      ...req.body,
    });
    res.status(201).json({ status: "success", data: { project } });
  } catch (err) {
    next(err);
  }
}

async function getProject(req, res, next) {
  try {
    const project = await projectModel.findById(req.params.id);
    if (!project) return next(new AppError("Project not found", 404));

    const member = await projectModel.getMember(project.id, req.user.id);
    if (!member) return next(new AppError("Not a member of this project", 403));

    res.status(200).json({ status: "success", data: { project } });
  } catch (err) {
    next(err);
  }
}

async function updateProject(req, res, next) {
  try {
    const project = await projectModel.findById(req.params.id);
    if (!project) return next(new AppError("Project not found", 404));

    const member = await projectModel.getMember(project.id, req.user.id);
    if (!member || member.role !== "owner") {
      return next(new AppError("Only project owners can update the project", 403));
    }

    const updated = await projectModel.update(project.id, req.body);
    res.status(200).json({ status: "success", data: { project: updated } });
  } catch (err) {
    next(err);
  }
}

async function deleteProject(req, res, next) {
  try {
    const project = await projectModel.findById(req.params.id);
    if (!project) return next(new AppError("Project not found", 404));

    if (project.owner_id !== req.user.id) {
      return next(new AppError("Only the project owner can delete this project", 403));
    }

    await projectModel.remove(project.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function listMembers(req, res, next) {
  try {
    const project = await projectModel.findById(req.params.id);
    if (!project) return next(new AppError("Project not found", 404));

    const member = await projectModel.getMember(project.id, req.user.id);
    if (!member) return next(new AppError("Not a member of this project", 403));

    const members = await projectModel.getMembers(project.id);
    res.status(200).json({ status: "success", data: { members } });
  } catch (err) {
    next(err);
  }
}

async function addMember(req, res, next) {
  try {
    const project = await projectModel.findById(req.params.id);
    if (!project) return next(new AppError("Project not found", 404));

    const caller = await projectModel.getMember(project.id, req.user.id);
    if (!caller || caller.role !== "owner") {
      return next(new AppError("Only project owners can add members", 403));
    }

    const already = await projectModel.getMember(project.id, req.body.user_id);
    if (already) return next(new AppError("User is already a member", 409));

    const membership = await projectModel.addMember({
      project_id: project.id,
      user_id: req.body.user_id,
      role: req.body.role,
    });
    res.status(201).json({ status: "success", data: { membership } });
  } catch (err) {
    next(err);
  }
}

async function removeMember(req, res, next) {
  try {
    const project = await projectModel.findById(req.params.id);
    if (!project) return next(new AppError("Project not found", 404));

    const caller = await projectModel.getMember(project.id, req.user.id);
    if (!caller || caller.role !== "owner") {
      return next(new AppError("Only project owners can remove members", 403));
    }

    if (req.params.userId === project.owner_id) {
      return next(new AppError("Cannot remove the project owner", 400));
    }

    await projectModel.removeMember(project.id, req.params.userId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  listMembers,
  addMember,
  removeMember,
};
