const mongoose = require("mongoose");

const importanceLevel_schema = new mongoose.Schema({
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


const importanceLevel = mongoose.model("importanceLevel",importanceLevel_schema,"importanceLevel")

module.exports = importanceLevel