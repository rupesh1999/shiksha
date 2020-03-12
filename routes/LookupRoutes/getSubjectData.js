const express = require("express");
const subjects = require("../../models/subjects");
const router = express.Router();

router.get("/getSubjectData",async(req,res)=>{
    try{
          const data = await subjects.find({})
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