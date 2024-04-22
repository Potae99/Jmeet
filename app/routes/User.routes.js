const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const Meetcontroller = require("../controllers/Timemeet.controller")

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.post(
        "/api/admin/createmeet",
        [authJwt.verifyToken, authJwt.isAdmin],
        Meetcontroller.createTimemeet
    );    
};
///////////////////////-------------------------------
// module.exports = app => {
//     const User = require("../controllers/auth.controller");

//     var router = require("express").Router();

//     //---------------------- Create a new User -------------------------

//     router.post("/User", User.createUser);
//     //--------------------- Get all User ------------------------------
//     router.get("/User", User.findAll);

//     //------------------------------------------------------------------
//     app.use('/api/Jmeet', router);

// };