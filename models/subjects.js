const mongoose = require("mongoose");

const subject_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
    },
    subjectCode:{
        type:Number,
        required:true
    },
    board:{
        type:Number,
        required:true
    },
    status:{
        type:Number,
        required:true
    }


})

const subjects = mongoose.model("subjects" , subject_schema)
module.exports =subjects