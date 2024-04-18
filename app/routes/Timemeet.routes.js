module.exports = app =>{
    const  Timemeet = require("../controllers/Timemeet.controller");
     
    var router =  require("express").Router();

//------------------------ Create meet --------------------------------
router.post("/Timemeet",Timemeet.createTimemeet);
//------------------------ Get all Meet ------------------------------------
router.get("/Timemeet",Timemeet.findAll);

app.use('/api/Jmeet',router);
 
}