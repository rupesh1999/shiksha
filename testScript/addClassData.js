const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const keys = require("../config/keys");

MongoClient.connect(keys.mongodb.URI,{useNewUrlParser:'true'},(error,client)=> {
    if (error) {
        console.log("Unable To connect To Database!!")
        return
    }
    const db = client.db('wc_shiksha')
    db.collection("classes").insertMany(
        [
            {
                name:"sixth",
                classCode:6,
                status:1
            },
            {
                name:"seventh",
                classCode:7,
                status:1
            },
            {
                name:"eight",
                classCode:8,
                status:1
            },
        ]
    ).then((result)=>{
        console.log("Successfully Added classes")
    }).catch((error)=>{
        console.log("Error Unable to add classes")
    })
})