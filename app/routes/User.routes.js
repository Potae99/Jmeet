module.exports = app => {
    const User = require("../controllers/User.controller");
     
    var router = require("express").Router();

//---------------------- Create a new User -------------------------

    router.post("/User",User.createUser);
//--------------------- Get all User ------------------------------
    router.get("/User", User.findAll);

//------------------------------------------------------------------
    app.use('/api/Jmeet',router);

};