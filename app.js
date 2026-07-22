const express = require("express");
const cors = require("cors");
const pollRoutes = require("./routes/polls");
const db = require("./db");
require("./models");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
// app.get("/", (req, res) => {
//   res.json({
//     message: "Polling API is working",
//   });
// });
app.use("/polls", pollRoutes);

db.sync()

const dbConnection = async () => {
  try {
    await db.sync();
    console.log(" Database is connected");
    
    app.listen(PORT, () => {
      console.log(`Server Running on Port: ${PORT}`);
    });
  } catch (error) {
    console.log("unbel to contect", error);
  }
}
dbConnection();
