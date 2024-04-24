const express = require("express");
const cors = require("cors");

var bcrypt = require("bcryptjs");

const app = express();

// app.use();

const db = require("./app/models");
const Role = db.role;
const User = db.User
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

require('./app/routes/auth.routes')(app);
require('./app/routes/User.routes')(app);



//----------------------
// require("./app/routes/usermeet.routes")(app);
// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
///---------------------------------------------
// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

////--------------------------------------------

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "admin"
  });

  pass = "admin1234"
  Password = pass
  User.create({
    UserID: 1234,
    Password: bcrypt.hashSync(Password, 8),
    Firstname: "Admin",
    Lastname: "Adminjaja",
    Callname: "admin"
}).then(user => {
    // ค้นหา role ที่มี name เป็น 'admin'
    Role.findOne({
        where: { name: 'admin' }
    }).then(role => {
        // ใช้ setRoles เพื่อกำหนด role ให้กับผู้ใช้
        user.setRoles([role.id]).then(() => {
            console.log('Role set successfully.');
        });
    });
}).catch(err => {
    console.log('Failed to create user: ', err.message);
});
}

//-----------------------------------
