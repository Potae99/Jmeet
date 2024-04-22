const db = require("../models");
const Usermeet = db.UserMeet;
const Op = db.Sequelize.Op;

exports.createUsermeet = (req, res) => {

    const Meet = {
        UserID: req.body.UserID,
        MeetID: req.body.MeetID

    };

    Usermeet.create(Meet)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while create the User.T_T"
            });
        });
};