const db = require("../models");
const Meet = db.UserTimemeet;
const User = db.User;
const Op = db.Sequelize.Op;
const UserMeet = db.UserMeet;



exports.findMeetByUserID = (req, res) => {
    const UserID = req.params.UserID;

    UserMeet.findAll({
        where: { UserID: UserID },
        include: [{
            model: Meet,
            as: 'meet',
        }]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving meets."
        });
    });
};




////--------------------------  Find All USer ----------------------////
exports.findAll = (req, res) => {
    const UserID = req.query.UserID;
    var condition = UserID ? { UserID: { [Op.iLike]: `%${UserID}%` } } : null;

    User.findAll({ where: condition,
        order: [['createdAt', 'DESC']] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving meets."
            });
        });
};