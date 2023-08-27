const Course = require("../models/Course");
const Tag = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

//create course handler function 
exports.createCourse = async(req,res)=>{
    try {
        
        //fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !price || !tag || !thumbnail || !whatYouWillLearn){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            });
        };

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById({userId})
        console.log(instructorDetails);
        if(!instructorDetails){
            return res.status(404).json({
                success : false ,message :"Instructor not found" });
        };

        //check given tag is valid or not 
        const tagDetails = await Tag.findById(tag)
        if(!tagDetails){
            return res.status(404).json({success:false, message:"invalid Tag"});
        };

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create entry for new course 
        const newCourse = await Course.create({
            courseName,
            instructor: instructorDetails._id,
            courseDescription,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url
        });

        //update new course in the course list of instructor
        await User.findByIdAndUpdate(
            {id:instructorDetails._id},
            { $push:{courses:newCourse._id} } ,
            {new:true}
        )

        //update the tag schema 


        //return response
        return res.status(200).json({
            success: true,
            message:"course created successfully",
            data:newCourse
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Internal server error",
            error:error.message,
        })
    }
}

//getAllcourses handler funciton

exports.showAllCourses = async(req ,res)=>{
    try {
        const allCourses = await Course.find({},{courseName:true, 
                                                price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                ratingAndReviews:true,
                                                studentsEnrolled:true,
                                                }).populate("instructor").exec();
                                            
        return res.status(200).json({
            success : true,
            message :"all courses fetched successfully ",
            data:allCourses
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success : false,
            message :"internal server error",
            error:error.message
        })
    }
}