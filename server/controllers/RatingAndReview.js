//make note of everything in this

const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");

//create Rating
exports.createRating = async(req,res)=>{
    try {
        //get user id
        const userId = req.user.id;

        //fetch data
        const{rating, review, courseId} = req.body;

        //check if user is enrolled or not 
        const courseDetails = await Course.findOne(
                                                    {_id:courseId,
                                                    studentsEnrolled:{$elemMatch:{$eq:userId}}}
                                                    );
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"You are not enrolled in this course"
                
            })
        }

        //check if already reviewed or not 
        const alreadyReviewed = await RatingAndReview.findOne(
                                                            {user:userId,
                                                            course:courseId
                                                        });
        
        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message:'Already Reviewed'
            });
        };


        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating, review, course:courseId, user:userId
        });
        

        //update course with this rating review object id 
        const udpdatedCourseDetails = await  Course.findByIdAndUpdate({_id:courseId},
                                        {
                                            $push:{
                                                ratingsReviews:ratingReview._id,
                                            }
                                        },
                                        {new:true}
                                    );
        console.log(udpdatedCourseDetails);
        
        //return res
        return res.status(200).json({
            success : true ,
            message :"Rating and review added successfully",
            ratingReview,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Internal Server Error",
            data:error.message
        })
    }
}

//get average rating 
exports.getAverageRating = async(req, res)=>{
    try {

        // get course id 
        const courseId = req.body.courseId ;

        // calculate average rating 
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                    },
            },
            {
                $group: {
                    _id:null,
                    averageRating: {$avg:"$rating"},
                }
            }
        ])

        // return rating 
        if(result.length > 0 ){
            return res.status(200).json({
                success:true,
                message:'average rating',
                data:result[0].averageRating
            })
        }

        //if no rating review exist 
        return res.status(200).json({
            success: true,
            message: "no one reviewd",
            data:0
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}

// get all rating and reviews
exports.getAllRating = async(req, res)=>{
    try {
        const allReviews = await RatingAndReview.find({})
                                                .sort({rating:"desc"})
                                                .populate({
                                                    path : 'user',
                                                    select:"firstName lastName email Image"
                                                })
                                                .populate({
                                                    path :"course",
                                                    select:"courseName",
                                                })
                                                .exec();
        
        console.log("allreviews");
        return res.status(200).json({
            success:true,
            message:"all review fetched",
            allReviews:`${allReviews}`,

        })


        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success : false ,
            message :"something went wrong",
            error:error.message
        })
    }
}



// H.W get all rating and review according to course and courseid