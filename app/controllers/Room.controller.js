const db = require("../models");
const Room = db.Room;


exports.createRoom = (req, res) => {

    const room = {
        RoomID: req.body.RoomID,
        Roomname: req.body.Roomname
    };

    Room.create(room)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while create the User.T_T"
            });
        });
};