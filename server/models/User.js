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
        default:"Student"
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:"Profile"
    },
    approved:{
        type : Boolean ,  //default value is false if not specified in the schema
        default:true,
    },
    active:{
        type :Boolean,//default value is true if not specified in the schema
        default:true
    },
    
    courses:[{
        type:mongoose.Schema.Types.ObjectID,
        ref:'Course'  //refers to the course model
    }],
    image:{
        type:String,
        required:true
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date
    },
    courseProgress:{
        type:mongoose.Schema.Types.ObjectID,
        ref:"CourseProgess",
    }
});

module.exports = mongoose.model("User",userSchema)