module.exports = app => {
    const FindMeetByUserID = require("../controllers/SearchMeet.controller");

    var router = require("express").Router();

    //------------------- Find Meeting by UserID -----------------------// 
    router.get("/Findmeet/:UserID", FindMeetByUserID.findMeetByUserID);
    app.use('/api/Jmeet', router);
}
