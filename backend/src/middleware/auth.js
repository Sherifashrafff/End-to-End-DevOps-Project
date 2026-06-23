const jwt = require("jsonwebtoken");
const { AppError } = require("./errorHandler");
const userModel = require("../models/userModel");

async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return next(new AppError("Authentication required", 401));
  }

  const token = header.slice(7);
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(err); // JsonWebTokenError / TokenExpiredError → errorHandler
  }

  const user = await userModel.findById(payload.sub);
  if (!user) return next(new AppError("User no longer exists", 401));

  req.user = user;
  next();
}

// Use after requireAuth to gate admin-only routes
function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return next(new AppError("Admin access required", 403));
  }
  next();
}

module.exports = { requireAuth, requireAdmin };
