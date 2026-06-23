const knex = require("knex");
const { dbConfig } = require("./env");

const db = knex({
  client: "pg",
  connection: dbConfig(),
  pool: {
    min: 2,
    max: 10,
    // Knex/pg default acquire timeout is sufficient for Aurora; tune with
    // acquireTimeoutMillis if your Aurora cluster has cold-start wake-up time.
  },
  // Return JS Date objects instead of strings for timestamp columns
  wrapIdentifier: (value, origImpl) => origImpl(value),
});

module.exports = db;
