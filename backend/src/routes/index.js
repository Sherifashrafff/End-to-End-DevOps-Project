const { Router } = require("express");

const router = Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/projects", require("./projects"));
// Nested: /projects/:projectId/tasks
router.use("/projects/:projectId/tasks", require("./tasks"));
// Standalone task access (by task ID, not project)
router.use("/tasks", require("./tasks"));
router.use("/comments", require("./comments"));

module.exports = router;
