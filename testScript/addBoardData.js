
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const keys = require("../config/keys");


MongoClient.connect(keys.mongodb.URI,{useNewUrlParser:'true'},(error,client)=> {
    if (error) {
        console.log("Unable To connect To Database!!")
        return 
    }
    const db = client.db('wc_shiksha')
    db.collection("boards").insertMany(
        [
             {
                 name:"Central Board Of Secondary Education",
                 boardCode:1,
                 status:1
              },
             {
                 name:"UP Board",
                 boardCode:2,
                 status: 1
             },
            {
                 name:"MP Board",
                 boardCode:3,
                 status:1
            }

        ]).then((result)=>{
        console.log("success!!,Boards Added")
    }).catch((error)=>{
        console.log("error!!,Unable to add Boards",error)
    })
     
})