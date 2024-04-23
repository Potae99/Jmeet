// const Search = require("../controllers/SearchMeet.controller");
module.exports = app => {
    const Search = require("../controllers/Search.controller");

    var router = require("express").Router();

    //------------------- Find All User -----------------------// 
    router.get("/admin/Alluser", Search.findAll);

    app.use('/api/Jmeet', router);
}