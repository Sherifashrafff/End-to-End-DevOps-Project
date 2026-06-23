const { Router } = require("express");
const c = require("../controllers/commentController");
const { requireAuth } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const schemas = require("../schemas/commentSchema");

const router = Router();

router.use(requireAuth);

router.patch("/:id", validate(schemas.update), c.updateComment);
router.delete("/:id", c.deleteComment);

module.exports = router;
