const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://postgres:root@localhost:5432/polling_app",
  {
    logging: false,
  }
);

db.authenticate()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Unable to connect:", err);
  });


module.exports = db;