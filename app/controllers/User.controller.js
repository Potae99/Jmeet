const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

exports.createUser = (req, res) => {
    if (!req.body.UserID || !req.body.Password || !req.body.role || !req.body.Firstname || !req.body.Lastname || !req.body.Callname) {
        res.status(400).send({
            message: "Content can not be empty!!!!"
        });
        return;
    }

    if (req.body.role !== "Admin" && req.body.role !== "User") {
        res.status(400).send({
            message: "Role must be either 'Admin' or 'User'."
        });
        return;
    }

    const user = {
        UserID: req.body.UserID,
        Password: req.body.Password,
        role: req.body.role,
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Callname: req.body.Callname
    };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while create the User.T_T"
            });
        });
};


//----------------------------------------------------- Find all User ------------------------------------------------------------
exports.findAll = (req, res) => {
    const UserID = req.query.UserID;
    var condition = UserID ? { UserID: { [Op.iLike]: `%${UserID}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving students."
            });
        });
};
