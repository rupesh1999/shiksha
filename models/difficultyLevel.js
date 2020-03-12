const mongoose = require("mongoose");

const difficultyLevel_schema = new mongoose.Schema({
 name:{
     type:String,
     required:true,
     lowercase:true
 },
 code:{
     type:Number,
     required:true
 }
})


const difficultyLevel = mongoose.model("difficultyLevel",difficultyLevel_schema,"difficultyLevel")

module.exports = difficultyLevel