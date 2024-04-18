const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// app.use();

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Peto application." });
});

// set port, listen for requests
require("./app/routes/User.routes")(app);
require("./app/routes/Timemeet.routes")(app);
require("./app/routes/FindMeetByUser.routes")(app);

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

////--------------------------------------------

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
  
  Role.create({
    id: 3,
    name: "admin"
  });
}