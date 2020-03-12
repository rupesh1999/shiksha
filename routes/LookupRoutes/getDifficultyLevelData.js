const express = require("express");
const difficultyLevel = require("../../models/difficultyLevel");
const router = express.Router();

router.get("/getDifficultyLevelData",async(req,res)=>{
    try{
          const data = await difficultyLevel.find({})
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