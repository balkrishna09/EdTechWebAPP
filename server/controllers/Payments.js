const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


//capture the payment and initiate the razorpay order
exports.capturePayment = async(req, res)=>{
    try {

        //get course and user id
        const {course_id}= req.body;
        const userId = req.user.id;

        //validaiton
        if(!course_id){
            return res.status(500).json({
                success:false,
                message: "Please provide a valid course Id"
            });
        };

        //valid courseId
        let course;
        try {
            course = await Course.findById(course_id);
            if(!course){
                return res.status(400).json({
                    success: false,
                    message:"No such course found with this Id"
                });
            };

            //check user already bought or not this course
            console.log(typeof userId);
            const uid = new mongoose.Types.ObjectId(userId);
            console.log(typeof userId);

            if(course.studentsEnrolled.includes(uid)){
                return res.status(403).json({
                    success: false,
                    message:"You have already enroled for this course."
                    });
            }

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || "Some Error Occurred!"
                });            
        }
        
        //order create
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency: currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{
                courseId: course_id,
                userId,
            }
        }

        try {
            
            //initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse)
            
            //return res
            return res.status(200).json({
                success: true,
                data: paymentResponse,
                message: "Payment Initiated Successfully!",
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency:paymentResponse.currency,
                amount: paymentResponse.amount,
            })

        } catch (error) {

            console.log("Error in creating order", error);
            return res.status(500).json({
                success: false,
                message: error.message || "Some Error Occurred!",
                errorDetails: error
                });          
        }
        //return response
        
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}

//verify signature of razorpay and server
exports.verifySignature = async(req, res)=>{
        const webhookSecret = "12345678";

        const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256",webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if(signature === digest){
            console.log("payment authorized");    
            
            const {courseId, userId} = req.body.payload.payment.entity.notes;

            try {
                //fullfill the action 

                //find the course and enroll the student in it
                const enrolledCourse = await Course.findOneAndUpdate(
                                                                    {_id:courseId},
                                                                    {$push:{studentsEnrolled:userId}},
                                                                    {new:true},
                );

                if(!enrolledCourse){
                    return res.status(500).json({
                        success: false,
                        message: "Something Went Wrong While Enrolling The Student In This Course!"
                    });
                };

                console.log(enrolledCourse);

                //find the student and update course list in it
                const enrolledStudent = await User.findOneAndUpdate(
                                                                    {_id:userId},
                                                                    {$push:{courses:courseId}},
                                                                    {new:true},
                );
                console.log(enrolledStudent);

                //mail send krdo confirmation wala
                const emailResponse = await mailSender(
                                                        enrolledStudent.mail,
                                                        "congratulation you are onboarded to new course",
                                                        "congratulation you are onboarded to new course"
                    );
                
                console.log(emailResponse);

                return res.status(200).json({
                    success: true,
                    message: "Payment Authorized Successfully!",
                    data: enrolledCourse
                });
                
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: error.message || "Some Error Occurred!"
                    });
            }
        } 
        else{
            return res.status(400).json({
                success: false,
                message: "Please Provide All Required Fields To Proceed Further With Your Request!"
            });
        }

        
};