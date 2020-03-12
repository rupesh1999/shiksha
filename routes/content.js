const express = require("express");
const passport = require("passport");
const Question = require("../models/question");
const media = require("../models/Media")
const router = express.Router();
const multer = require('multer')
const path = require("path")


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,'routes/uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+new Date().getTime().toString()+path.extname(file.originalname))
    }

}) 
const upload = multer({storage:storage})

router.post("/questions/add"  ,upload.any(),passport.authenticate("jwt" , {session : false}),(req , res) => {
       let authCheck = 1;
      req.user.role.forEach(element => {
         if(element === "teacher" || element === "sme"){
               authCheck++;
            }
        });

       if(authCheck === 0){
           return res.json({
              success : false,
              msg : "you are not authorized to add a question"
            });
      }
     var totalImage = []
     var result = []
   var totalImageNumber= req.files.length
  
     for(i=0;i<totalImageNumber;i++){
         totalImage[i] = new media({
            url:req.files[i].filename,
            type:path.extname(req.files[i].filename),
            Imagetype:req.files[i].fieldname
     
         })
     }
    var total = totalImage.length
    if(totalImageNumber!=0){
   
    media.collection.insertMany(totalImage,(err,saved)=>{
         if(err){
            return res.json({
                success : false,
                msg : "Unable to add Images so question addition is aborted"
            });
         }else{
               
              result =  Object.keys(saved.insertedIds).map((key)=>{
                 return saved.insertedIds[key]
            
             })
             const{standard,board,subject,board_chapter,board_chapter_subtopic,tags,
                difficultyLevel, importanceLevel,   expectedTime,  marks,
                status,source,question, createdBy,updateBy,
                remarks, answerExplanation, answer, ismcq , containsImage ,
               lineSpace } = req.body;
               const newQuestion = new Question({
                class:standard,
                board:board,
                subject:subject,
                board_chapter:board_chapter,
                board_chapter_subtopic:board_chapter_subtopic,
                tags:tags,
                difficultyLevel: difficultyLevel,
                importanceLevel:importanceLevel,
                expectedTime:expectedTime,
                marks:marks,
                status:1,
                source:source,
                answerExplanation:answerExplanation,
                remarks:remarks,
                question:question,
                createdBy:createdBy,
                updateBy:updateBy,
                answer:answer,
                ismcq:ismcq,
                containsImage:true,
                lineSpace:lineSpace,
                media:result
            });  
            newQuestion.save().then((document) => {
                res.json({
                    success : true,
                    msg : "question was added successfully"
                });
                
            }).catch((err) => {
                console.log(err);
                res.json({
                    success : false,
                    msg : "question was not added successfully"
                });
            });
           

            
         }
     })  
    }
    else{
        const{standard,board,subject,board_chapter,board_chapter_subtopic,tags,
            difficultyLevel, importanceLevel,   expectedTime,  marks,
            status,source,question, createdBy,updateBy,
            remarks, answerExplanation, answer, ismcq , containsImage ,
           lineSpace } = req.body;
           const newQuestion = new Question({
            class:standard,
            board:board,
            subject:subject,
            board_chapter:board_chapter,
            board_chapter_subtopic:board_chapter_subtopic,
            tags:tags,
            difficultyLevel: difficultyLevel,
            importanceLevel:importanceLevel,
            expectedTime:expectedTime,
            marks:marks,
            status:1,
            source:source,
            question:question,
            createdBy:createdBy,
            answerExplanation:answerExplanation,
            remarks:remarks,
            updateBy:updateBy,
            answer:answer,
            ismcq:ismcq,
            containsImage:false,
            lineSpace:lineSpace,
            media:null
        });  
        newQuestion.save().then((document) => {
            res.json({
                success : true,
                msg : "question was added successfully"
            });
            
        }).catch((err) => {
            console.log(err);
            res.json({
                success : false,
                msg : "question was not added successfully"
            });
        });



    }
});

module.exports = router;