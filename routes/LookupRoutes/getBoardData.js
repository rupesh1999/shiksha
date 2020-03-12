const express = require("express");
const board = require("../../models/Board");
const router = express.Router();
//const cors = require("cors");

let middleware = (res, req, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

router.get("/getBoardData" , async(req,res)=>{
    try{
          const data = await board.find({})
          const  NewData = [...data]
          const completeData = {
              data:NewData,
              errorValue:false
        }
        res.status(200).json(completeData)
          
    }
    catch(e){
        e.errorValue = true;
        res.status(400).json(e)
    }
   
}   
)
module.exports = router;
