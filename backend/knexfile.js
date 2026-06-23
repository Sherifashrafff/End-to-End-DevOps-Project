require("dotenv").config();
const { dbConfig } = require("./src/config/env");

/** @type {import('knex').Knex.Config} */
module.exports = {
  client: "pg",
  connection: dbConfig(),
  pool: { min: 2, max: 10 },
  migrations: {
    directory: "./db/migrations",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};
