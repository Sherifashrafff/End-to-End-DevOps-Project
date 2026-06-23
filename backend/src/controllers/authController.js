const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/userModel");
const { AppError } = require("../middleware/errorHandler");

function signToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

async function register(req, res, next) {
  try {
    const { email, password, full_name } = req.body;

    const existing = await userModel.findByEmail(email);
    if (existing) return next(new AppError("Email already registered", 409));

    const password_hash = await bcrypt.hash(password, 12);
    const user = await userModel.create({ id: uuidv4(), email, password_hash, full_name });

    const token = signToken(user.id);
    res.status(201).json({ status: "success", token, data: { user } });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return next(new AppError("Invalid email or password", 401));
    }

    const { password_hash, ...safeUser } = user;
    const token = signToken(user.id);
    res.status(200).json({ status: "success", token, data: { user: safeUser } });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
