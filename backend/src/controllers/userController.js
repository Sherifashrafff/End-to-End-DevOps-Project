const userModel = require("../models/userModel");
const { AppError } = require("../middleware/errorHandler");

async function getMe(req, res) {
  res.status(200).json({ status: "success", data: { user: req.user } });
}

async function updateMe(req, res, next) {
  try {
    const { full_name, email } = req.body;
    const updated = await userModel.update(req.user.id, { full_name, email });
    res.status(200).json({ status: "success", data: { user: updated } });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMe, updateMe };
