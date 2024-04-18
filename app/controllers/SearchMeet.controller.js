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
            message: err.message || "Some error occurred while retrieving student data T_T"
        });
    });

};
