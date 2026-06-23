const { z } = require("zod");

const create = z.object({
  body: z.string().min(1).max(5000),
});

const update = z.object({
  body: z.string().min(1).max(5000),
});

const listQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

const userUpdateSchema = z.object({
  full_name: z.string().min(1).max(120).optional(),
  email: z.string().email().optional(),
});

module.exports = { create, update, listQuery, userUpdateSchema };
