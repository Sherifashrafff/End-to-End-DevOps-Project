const { Router } = require("express");
const c = require("../controllers/taskController");
const commentC = require("../controllers/commentController");
const { requireAuth } = require("../middleware/auth");
const { validate, validateQuery } = require("../middleware/validate");
const taskSchemas = require("../schemas/taskSchema");
const commentSchemas = require("../schemas/commentSchema");

const router = Router({ mergeParams: true });

router.use(requireAuth);

// /api/v1/projects/:projectId/tasks
router.get("/", validateQuery(taskSchemas.listQuery), c.listTasks);
router.post("/", validate(taskSchemas.create), c.createTask);

// /api/v1/tasks/:id  (mounted separately in index.js)
router.get("/:id", c.getTask);
router.patch("/:id", validate(taskSchemas.update), c.updateTask);
router.delete("/:id", c.deleteTask);

// /api/v1/tasks/:taskId/comments
router.get("/:taskId/comments", validateQuery(commentSchemas.listQuery), commentC.listComments);
router.post("/:taskId/comments", validate(commentSchemas.create), commentC.createComment);

module.exports = router;
