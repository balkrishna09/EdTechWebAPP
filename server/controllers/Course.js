const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create course handler function 
exports.createCourse = async(req,res)=>{
    try {
        
        //fetch data
        let {courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions,} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !price || !tag || !thumbnail || !whatYouWillLearn || !category){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            });
        };

        if (!status || status === undefined) {
			status = "Draft";
		}

        //check for instructor
        const userId = req.user.id;
        
        const instructorDetails = await User.findById(userId,{
            accountType:"Instructor",
        })

        console.log(instructorDetails);
        if(!instructorDetails){
            return res.status(404).json({
                success : false ,message :"Instructor not found" });
        };

        //check given tag is valid or not 
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({success:false, message:"invalid Tag"});
        };

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        console.log(thumbnailImage);

        //create entry for new course 
        const newCourse = await Course.create({
            courseName,
            instructor: instructorDetails._id,
            courseDescription,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
        });

        //update new course in the course list of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            { $push:{courses:newCourse._id} } ,
            {new:true}
        )

        // Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);


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
exports.getAllCourses = async(req ,res)=>{
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


//getCourseDetails
exports.getCourseDetails = async(req, res)=>{
	try {
		
		const{courseId} = req.body;

		//find course details 
		const courseDetails = await Course.find({_id:courseId})
												.populate({
													path:"instructor" ,
													populate:{
														path:"additionalDetails",
													}
												})
												.populate("category")
												// .populate("ratingAndReviews")
												.populate({
													path:"courseContent",
													populate:{
														path:"subSection"
													}
												})
												.exec();
	    //validation 
		if(!courseDetails){
			return res.status(400).json({
				success :false,
				message:`Course Not Found with id ${courseId}`
			});
		};

		//return res
		return res.status(200).json({
			success  :true,
			message:"Course details fetch successfully",
			data:courseDetails
		});
		
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: false,
			message: error.message,
		})
	}
}