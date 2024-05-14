const db = require("../models");
const Meet = db.Meet;
const User = db.User;
const Room = db.Room;
const Op = db.Sequelize.Op;




exports.findMeetByUserID = (req, res) => {
    const UserID = req.params.UserID;

    Meet.findAll({
        where: { UserID: UserID },
        include: [
            {
                model: User,
                attributes: ['UserID', 'Firstname', 'Lastname', 'Callname'] // Adjust attributes as needed
            },
            {
                model: Room,
                attributes: ['RoomID', 'Roomname'] // Adjust attributes as needed
            }
        ]
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