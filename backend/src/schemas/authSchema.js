const { z } = require("zod");

const register = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  full_name: z.string().min(1).max(120),
});

const login = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

module.exports = { register, login };
