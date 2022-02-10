require("dotenv").config();
const express = require("express");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

const db = require("./app/models");

db.sequelize.sync();

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Todo lists API" });
});

// Auth route
require("./app/routes/auth.routes")(app);

// Tasks routes
require("./app/routes/tasks.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
