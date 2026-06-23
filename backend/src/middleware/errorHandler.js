class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Central error handler — Express identifies it by the 4-argument signature.
function errorHandler(err, req, res, next) {
  // Zod validation errors arrive with a "issues" array
  if (err.name === "ZodError") {
    return res.status(422).json({
      status: "error",
      message: "Validation failed",
      errors: err.issues.map((i) => ({ field: i.path.join("."), message: i.message })),
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ status: "error", message: "Invalid or expired token" });
  }

  // pg unique-violation (duplicate email, etc.)
  if (err.code === "23505") {
    return res.status(409).json({ status: "error", message: "A record with that value already exists" });
  }

  // pg foreign-key violation
  if (err.code === "23503") {
    return res.status(422).json({ status: "error", message: "Referenced resource does not exist" });
  }

  const status = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Something went wrong";

  // Never leak stack traces in production
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(status).json({ status: "error", message });
}

module.exports = { AppError, errorHandler };
