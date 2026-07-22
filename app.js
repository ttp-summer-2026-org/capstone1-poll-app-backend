const express = require("express");
const cors = require("cors");

const pollRoutes = require("./routes/polls");
const db = require("./db");

// Load all models and associations
require("./models");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Polling API is working",
  });
});

// Poll routes
app.use("/polls", pollRoutes);

// Connect database and start server
const dbConnection = async () => {
  try {
    await db.authenticate();
    console.log("Database connection successful");

    await db.sync();
    console.log("Database tables synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
};

dbConnection();