const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://postgres:root@localhost:5432/polling_app",
  {
    logging: false,
    dialectOptions:
      process.env.NODE_ENV === "production"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
  }
);

module.exports = db;