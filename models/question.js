const mongoose = require("mongoose");

const question_schema = new mongoose.Schema({
    class:{
        type: Array,
        required: true,
        lowercase: true
    },
    board:{
        type: Array,
        required: true,
        lowercase: true

    },
    subject:{
        type: Array,
        required: true,
        lowercase: true
        
    },
    board_chapter:{
        type: Array,
        required: true,
        lowercase: true
    },
    board_chapter_subtopic:{
        type: Array,
        required: false,
        lowercase: true
    },
    tags:{
        type: Array,
        required: false,
        lowercase: true
    },
    difficultyLevel:{
        type: Number,
        required: true
    },
    importanceLevel:{
        type: Number,
        required: false
    },
    expectedTime:{
        type: Number,
        required: false
    },
    marks:{
        type: Number,
        required: false
    },
    status:{
        type: Number,
        required: true
    },
    source:{
        type: String,
        required: false,
        lowercase: true
    },
    question:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        required: false,
        default:Date.now
    },
    createdBy:{
        type: String,
        required: false,
        lowercase: true
    },
    updatedAt:{
        type: Date,
        required: false
    },
    updateBy : {
        type: String,
        required : false,
        lowercase: true
    },
    remarks:{
        type: String,
        required: false,
        lowercase: true
    },
    answer:{
        type: Array,
        required: true
    },
    answerExplanation:{
        type: String,
        required: false
    },
    isMCQ:{
        type: Boolean,
        required: false
    },
    containsImage:{
        type: Boolean,
        required: true
    },
    media:{
        type:Array,
        required:false
    },
    
    lineSpace:{
        type: Number,
        required: false
    }
});



const question = mongoose.model("document", question_schema , "questions");

module.exports = question;

