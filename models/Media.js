const mongoose = require("mongoose");

const media_schema = mongoose.Schema({
url:{
    type:String,
    require:true
},
type:{
    type:String,
    require:true
},
Imagetype:{
    type:String,
    require:true
},
createdAt:{
    type:Date,
    default:Date.now
}

})
const media = mongoose.model("media" , media_schema)
module.exports =media