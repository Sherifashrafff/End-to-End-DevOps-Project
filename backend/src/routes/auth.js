const { Router } = require("express");
const { register, login } = require("../controllers/authController");
const { validate } = require("../middleware/validate");
const { authLimiter } = require("../middleware/rateLimiter");
const schemas = require("../schemas/authSchema");

const router = Router();

router.post("/register", authLimiter, validate(schemas.register), register);
router.post("/login", authLimiter, validate(schemas.login), login);

module.exports = router;
