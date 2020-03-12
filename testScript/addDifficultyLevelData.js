const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const keys = require("../config/keys");


MongoClient.connect(keys.mongodb.URI,{useNewUrlParser:'true'},(error,client)=> {
    if (error) {
        console.log("Unable To connect To Database!!")
        return 
    }
    const db = client.db('wc_shiksha')
    db.collection("difficultyLevel").insertMany(  [
        {
            name:"Easy",
            code:1
          
         },
        {
            name:"Medium",
           code:2
            
        },
       {
            name:"Hard",
            code:3,
            
       },
       {
           name:"Very Hard",
           code:4,
           
       }


   ]).then((result)=>{
    console.log("success!!,Difficulty Level Added")
}).catch((error)=>{
    console.log("error!!,Unable to add Difficulty Level",error)
})
 
})