const mongoose = require("mongoose");
const courseProgress = new mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectID,
        ref:"Course"
    },
    completedVideo:[
        {
            type:mongoose.Schema.Types.ObjectID,
            ref:"SubSection"
        }
    ]

});

module.exports = mongoose.model("CourseProgress",courseProgress)