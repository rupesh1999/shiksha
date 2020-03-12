const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

MongoClient.connect("mongodb://35.237.89.50:27017",{useNewUrlParser:'true'},(error,client)=> {
    if (error) {
        console.log("Unable To connect To Database!!")
        return
    }
    const db = client.db('wc_shiksha')
    db.collection("boards").deleteMany({}).then((result)=>{
        console.log("Succesfully Deleted Boards Data")
    }).catch((error)=>{
        console.log("Error Unable to delete Boards Data")
    })

    db.collection("classes").deleteMany({}).then((result)=>{
        console.log("Succesfully Deleted class Data")
    }).catch((error)=>{
        console.log("Error Unable to delete class Data")
    })

})