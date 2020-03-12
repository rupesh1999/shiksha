const mongoose = require("mongoose");

const classes_schema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    classCode:{
        type:Number,
        required:true,
        lowercase:true

    },
    status:{
        type:Number,
        required:true,
    }

})

const classes = mongoose.model("classes" , classes_schema)
module.exports =classes