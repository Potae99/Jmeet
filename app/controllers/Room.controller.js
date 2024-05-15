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
                message: err.message || "Some error occurred while create the Room.T_T"
            });
        });
};

//--------------------------------- find all room ------------------------------
exports.findAllRoom = (req, res) => {
    Room.findAll({
        attributes: ['RoomID', 'Roomname'] // เลือกเฉพาะฟิลด์ RoomID และ Roomname
    })
    .then(data => {
        if (!data || data.length === 0) {
            return res.status(404).send({
                message: "No rooms found."
            });
        }
        const cleanData = data.map(room => ({
            RoomID: room.RoomID,
            Roomname: room.Roomname
        }));
        res.send(cleanData);
    })
    .catch(err => {
        console.error("Error retrieving rooms:", err.message);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving rooms."
        });
    });
};