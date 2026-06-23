const { z } = require("zod");

const create = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(2000).optional(),
  status: z.enum(["active", "archived"]).default("active"),
});

const update = z.object({
  name: z.string().min(1).max(120).optional(),
  description: z.string().max(2000).optional(),
  status: z.enum(["active", "archived"]).optional(),
});

const addMember = z.object({
  user_id: z.string().uuid(),
  role: z.enum(["member", "owner"]).default("member"),
});

const listQuery = z.object({
  status: z.enum(["active", "archived"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

module.exports = { create, update, addMember, listQuery };
