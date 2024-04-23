const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const Meetcontroller = require("../controllers/Timemeet.controller")
const Search = require("../controllers/Search.controller");


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

    ///////////////-- admin create meeting room --//////////////////
    app.post(
        "/api/admin/createmeet",
        [authJwt.verifyToken, authJwt.isAdmin],
        Meetcontroller.createTimemeet
    );
    ////////////////---- admin get all user -- ///////////////////

    app.get("/api/Jmeet/admin/findalluser",
        [authJwt.verifyToken, authJwt.isAdmin],
        Meetcontroller.findAll
    );
    ////////////////---- admin delete user -- ///////////////////
    app.delete(
        "/api/admin/delete/user/:UserID",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteUser
    );
    ////////////////---- admin update user ------//////////////////
    app.put(
        "/api/admin/update/user/:UserID",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.editUser
    );


};
