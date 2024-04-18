exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    console.log("UserID is = "+ req.UserID);////print from token
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};