const express = require("express");
const importanceLevel = require("../../models/importanceLevel");
const router = express.Router();

router.get("/getImportanceLevelData",async(req,res)=>{
    try{
          const data = await importanceLevel.find({})
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