module.exports = app =>{
    const  Timemeet = require("../controllers/Timemeet.controller");
     
    var router =  require("express").Router();

//------------------------ Create meet --------------------------------
router.post("/Timemeet",Timemeet.createTimemeet);

//------------------------ Get all Meet ------------------------------------
router.get("/Timemeet",Timemeet.findAll);

//------------------------- Edit meet ------------------------------------
router.put("/Edit/Timemeet/:MeetID",Timemeet.editMeet);

//-------------------------- Delete Meet -------------------------------
router.delete("/Delete/Timemeet/:MeetID",Timemeet.deleteMeet);

app.use('/api/Jmeet',router);
 
}