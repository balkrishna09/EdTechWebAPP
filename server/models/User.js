const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin", "Student", "Instructor"],
        required:true,
        default:"User"
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:"Profile"
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectID,
        ref:'Course'  //refers to the course model
    }],
    image:{
        type:String,
        required:true
    },
    courseProgress:{
        type:mongoose.Schema.Types.ObjectID,
        ref:"CourseProgess",
    }
});

module.exports = mongoose.model("User",userSchema)