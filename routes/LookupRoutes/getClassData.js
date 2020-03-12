const express = require("express");
const classes = require("../../models/Classes");
const router = express.Router();

router.get("/getClassData",async(req,res)=>{
    try{
          const data = await classes.find({})
          const  NewData = [...data]
          const completeData = {
              data:NewData,
              errorValue:false
          }
         res.status(200).send(completeData)
          
    }
    catch(e){
        e.errorValue = true;
        res.status(400).send(e)
    }
   
}
    
)
module.exports = router;