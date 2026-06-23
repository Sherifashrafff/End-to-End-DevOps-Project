const { Router } = require("express");
const { getMe, updateMe } = require("../controllers/userController");
const { requireAuth } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { userUpdateSchema } = require("../schemas/commentSchema");

const router = Router();

router.use(requireAuth);

router.get("/me", getMe);
router.patch("/me", validate(userUpdateSchema), updateMe);

module.exports = router;
