const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const keys = require("../config/keys");


MongoClient.connect(keys.mongodb.URI,{useNewUrlParser:'true'},(error,client)=> {
    if (error) {
        console.log("Unable To connect To Database!!")
        return 
    }
    const db = client.db('wc_shiksha')
    db.collection("importanceLevel").insertMany(  [
        {
            name:"Not Important",
            code:1
          
         },
        {
            name:"Important",
           code:2
            
        },
       {
            name:"Very important",
            code:3,
            
       }
      

   ]).then((result)=>{
    console.log("success!!,Importance Level Added")
}).catch((error)=>{
    console.log("error!!,Unable to add Importance Level",error)
})
 
})