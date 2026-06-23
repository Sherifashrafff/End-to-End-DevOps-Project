const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { generalLimiter } = require("./middleware/rateLimiter");
const { errorHandler } = require("./middleware/errorHandler");
const db = require("./config/db");

const app = express();

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS — origins come from env; never wildcard in production ────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : false,
    credentials: true,
  })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "1mb" }));

// ── Global rate limiter ───────────────────────────────────────────────────────
app.use(generalLimiter);

// ── Health probes (no auth, no rate limiting beyond global) ──────────────────
// Liveness: process is alive and event loop not blocked
app.get("/healthz", (req, res) => res.status(200).json({ status: "ok" }));

// Readiness: can we reach the DB?
app.get("/readyz", async (req, res) => {
  try {
    await db.raw("SELECT 1");
    res.status(200).json({ status: "ok" });
  } catch {
    res.status(503).json({ status: "unavailable", reason: "database unreachable" });
  }
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use("/api/v1", require("./routes/index"));

// ── 404 catch-all ────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ status: "error", message: "Route not found" }));

// ── Central error handler ─────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
