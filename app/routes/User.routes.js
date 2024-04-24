const { authJwt } = require("../../app/middleware");
const controller = require("../../app/controllers/user.controller");
const Meetcontroller = require("../../app/controllers/Timemeet.controller")
const Meet = require("../../app/controllers/Timemeet.controller");
const Findmeetbyuser = require("../../app/controllers/Search.controller");
const Usermeet = require("../../app/controllers/Usermeet.controller");


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


    ////////////////////////////////-----------------  ADMIN --------------------------------//////////////////////////////

    ///////////////-- admin create meeting  --//////////////////** */
    app.post(
        "/api/admin/createmeet",
        [authJwt.verifyToken, authJwt.isAdmin],
        Meetcontroller.createTimemeet
    );
    ////////////////---- admin get all meet -- ///////////////////** */

    app.get("/api/admin/get/findallmeet",
        [authJwt.verifyToken, authJwt.isAdmin],
        Meetcontroller.findAll
    );
    ////////// -----admin get all user -------///////////////////////
    app.get("/api/admin/get/alluser",
        [authJwt.verifyToken, authJwt.isAdmin],
        Findmeetbyuser.findAll
    );
    ////////////////---- admin delete user -- ///////////////////** */
    app.delete(
        "/api/admin/delete/user/:UserID",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteUser
    );
    ////////////////---- admin update user ------//////////////////** */
    app.put(
        "/api/admin/update/user/:UserID",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.editUser
    );
    ////////////////---- admin delete meet ------/////////////////** */

    app.delete("/api/admin/delete/meet/:MeetID",
        [authJwt.verifyToken, authJwt.isAdmin],
        Meet.deleteMeet

    );

    //////////////----- update meet -----/////////////////////** */

    app.put("/api/admin/update/meet/:MeetID",
        [authJwt.verifyToken, authJwt.isAdmin],
        Meet.editMeet
    );

    ///////------------- craete usermeet -----------------//////** */
    app.post("/api/admin/post/usermeet",
        [authJwt.verifyToken, authJwt.isAdmin],
        Usermeet.createUsermeet
    )


    ////--------------------------------------------------------- User ------------------------------------------------------//////

    //////---------------------------- user get own meet ------------------------/////** */
    app.get(
        "/api/user/find/meetbyuser/:UserID",
        [authJwt.verifyToken],
        Findmeetbyuser.findMeetByUserID
    );
    /////----------------------------- user delete own meet ---------------------/////** */

    app.delete(
        "/api/user/delete/meet/:MeetID",
        [authJwt.verifyToken],
        Meet.deleteMeet
    );

    //////-------------------------- user create meet -------------------------//////** */

    app.post("/api/user/post/meet",
        [authJwt.verifyToken],
        Meet.createTimemeet
    );

    ////---------------------------- user get all meet -------------------------////** */
    app.get("/api/user/get/allmeet",
        [authJwt.verifyToken],
        Meet.findAll
    );









};
