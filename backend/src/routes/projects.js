const { Router } = require("express");
const c = require("../controllers/projectController");
const { requireAuth } = require("../middleware/auth");
const { validate, validateQuery } = require("../middleware/validate");
const schemas = require("../schemas/projectSchema");

const router = Router();

router.use(requireAuth);

router.get("/", validateQuery(schemas.listQuery), c.listProjects);
router.post("/", validate(schemas.create), c.createProject);
router.get("/:id", c.getProject);
router.patch("/:id", validate(schemas.update), c.updateProject);
router.delete("/:id", c.deleteProject);

router.get("/:id/members", c.listMembers);
router.post("/:id/members", validate(schemas.addMember), c.addMember);
router.delete("/:id/members/:userId", c.removeMember);

module.exports = router;
