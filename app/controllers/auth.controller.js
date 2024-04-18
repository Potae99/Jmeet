const db = require("../models");
const config = require("../config/auth.config")
const User = db.User;
const Role = db.role;
const Op = db.Sequelize.Op;

//----------------------------------------
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


//-----------------------------------------------------------------------------------------------------------------------------
exports.signup = (req, res) => {

    if (!req.body.UserID || !req.body.Password || !req.body.Firstname || !req.body.Lastname || !req.body.Callname) {
        res.status(400).send({
            message: "Content can not be empty!!!!"
        });
        return;
    }
    ///////////////////////
    const user = {
        UserID: req.body.UserID,
        Password: bcrypt.hashSync(req.body.Password, 8),
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Callname: req.body.Callname
    };
    // Save User to Database
    User.create(user)
        .then(User => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    User.setRoles(roles).then(() => {
                        res.send({ message: "User registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                User.setRoles([1]).then(() => {
                    res.send({ message: "User registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

//-------------------------------------------------- Signin ---------------------------------------------------------------------
exports.signin = (req, res) => {
    User.findOne({
      where: {
        UserID: req.body.UserID,
      }
    })
      .then(User => {
        if (!User) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.Password,
          User.Password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        const token = jwt.sign({ id: User.UserID },
          config.secret,
          {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
          });
  
        var authorities = [];
        User.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: User.id,
            UserID: req.body.UserID,
            Firstname: req.body.Firstname,
            Lastname: req.body.Lastname,
            Callname: req.body.Callname,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };



//----------------------------------------------------- Find all User ------------------------------------------------------------
// exports.findAll = (req, res) => {
//     const UserID = req.query.UserID;
//     var condition = UserID ? { UserID: { [Op.iLike]: `%${UserID}%` } } : null;

//     User.findAll({ where: condition })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving students."
//             });
//         });
// };
