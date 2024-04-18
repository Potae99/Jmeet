const db = require("../models");
const Timemeet = db.UserTimemeet;
const Op = db.Sequelize.Op;

exports.createTimemeet = (req, res) => {
    if (!req.body.UserID) {
        res.status(400).send({
            message: "Content can not be empty!!!!"
        });
        return;
    }

    const Time = {
        UserID: req.body.UserID,
        MeetID: req.body.MeetID,
        title: req.body.title,
        start: req.body.start,
        end: req.body.end
    };

    Timemeet.create(Time)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while create the User.T_T"
            });
        });
};
//----------------------------------------------------- Find all meet ------------------------------------------------------------
exports.findAll = (req, res) => {
    const MeetID = req.query.MeetID;
    var condition = MeetID ? { MeetID: { [Op.iLike]: `%${MeetID}%` } } : null;

    Timemeet.findAll({ where: condition })
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