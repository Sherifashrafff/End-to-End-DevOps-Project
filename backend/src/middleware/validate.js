// Factory that returns an Express middleware validating req.body against a Zod schema.
// Throws ZodError on failure, which the central errorHandler converts to a 422 response.
function validate(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}

// Validates req.query instead of req.body (used for list/filter endpoints)
function validateQuery(schema) {
  return (req, res, next) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { validate, validateQuery };
