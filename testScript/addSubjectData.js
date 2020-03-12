const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const keys = require("../config/keys");


MongoClient.connect(keys.mongodb.URI,{useNewUrlParser:'true'},(error,client)=> {
    if (error) {
        console.log("Unable To connect To Database!!")
        return 
    }
    const db = client.db('wc_shiksha')
    db.collection("subjects").insertMany(  [
        {
            name:"English",
            subjectCode:101,
            board:1,
            status:101
         },
        {
            name:"Physics",
            subjectCode:102,
            board:1,
            status: 1
        },
       {
            name:"Maths",
            subjectCode:103,
            board:1,
            status:1
       },
       {
           name:"Chemistry",
           subjectCode:104,
           board:1,
           status:1
       }


   ]).then((result)=>{
    console.log("success!!,Subjects Added")
}).catch((error)=>{
    console.log("error!!,Unable to add Subjects",error)
})
 
})