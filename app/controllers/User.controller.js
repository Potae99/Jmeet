const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");
//////////////////--------------------------------------
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    console.log("UserID is = " + req.UserID);////print from token
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
//////////////////////////////---------------------- delete user -----------------------------------------/////////////////////
exports.deleteUser = (req, res) => {
    const UserID = req.params.UserID;

    User.destroy({
        where: { UserID: UserID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${UserID}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + UserID
            });
        });
};

///////////////////////////////------------------------------ update user --------------------------------------------/////////////
exports.editUser = async (req, res) => {
    const UserID = req.params.UserID;

    try {
        const user = await User.findByPk(UserID);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        if (req.body.Password) {
            req.body.Password = await bcrypt.hash(req.body.Password, 8);
        }

        await user.update(req.body);

        res.send({ message: "User updated successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
