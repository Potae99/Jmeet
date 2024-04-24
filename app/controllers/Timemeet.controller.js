const db = require("../models");
const Timemeet = db.UserTimemeet;
const Op = db.Sequelize.Op;

exports.createTimemeet = (req, res) => {

    const Time = {
        // UserID: req.body.UserID,
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
                message: err.message || "Some error occurred while create the Meet .T_T"
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
                    err.message || "Some error occurred while retrieving meets."
            });
        });
};
//-------------------------------------------------------- Find meet by id ----------------------------------------------------------

//-------------------------------------------------------- Edit meet ----------------------------------------------------------------
exports.editMeet = (req, res) => {
    const MeetID = req.params.MeetID;
    Timemeet.update(req.body, {
        where: { MeetID: MeetID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Meet was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Meet with MeetID=${MeetID}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Meet with MeetID=" + MeetID
            });
        });
};

///----------------------------------------------- Delete Meet --------------------------///
exports.deleteMeet = (req, res) => {
    const MeetID = req.params.MeetID;

    Timemeet.destroy({
        where: { MeetID: MeetID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Meet was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Meet with MeetID =${MeetID}. Maybe Meet was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Meet with MeetID =" + MeetID
            });
        });
};