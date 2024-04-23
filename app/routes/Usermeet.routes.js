
module.exports = app => {
    const Usermeet = require("../controllers/Usermeet.controller");

    var router = require("express").Router();

    //------------------------ Create meet --------------------------------
    router.post("/Usermeet", Usermeet.createUsermeet);
    //------------------------ Get all Meet ------------------------------------


    app.use('/api/Jmeet', router);

};