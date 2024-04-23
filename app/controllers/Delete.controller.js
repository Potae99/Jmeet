const db = require("../models");
const Meet = db.UserTimemeet;
const User = db.User;
const Op =  db.Sequelize.Op;

exports.findMeetByUserID = (req, res) =>{
    const id = req.params.UserID;
    User.findOne({
        where:{
            UserID : id
        },
        include: [{
            model: Meet,
            as: 'MeetByUserID'
        }]
    })
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving meet data T_T"
        });
    });

};
////--------------------------  Find All USer ----------------------////
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
                    err.message || "Some error occurred while retrieving meets."
            });
        });
};