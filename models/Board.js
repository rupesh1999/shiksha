const mongoose = require("mongoose");

const boards_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    boardCode:{
        type:Number,
        required:true,

    },
    status:{
        type:Number,
        required:true,
    }

})

const boards = mongoose.model("boards" , boards_schema );

module.exports = boards