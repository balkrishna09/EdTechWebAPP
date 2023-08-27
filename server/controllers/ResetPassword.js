const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//reset password token
exports.resetPasswordToken = async (req, res) => {
  try {
    // extract email from body
    const email = req.body.email;

    //check if mail exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "email is not registered with us please signup",
      });
    }

    //generate token
    const token = crypto.randomUUID();
    console.log(token);

    //update user by adding token and expiration time
    const updatedDetails = await User.fineOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    //create url
    const url = `http://localhost:3000/update-password/${token}`;

    //send mail containing the URL
    await mailSender(
      email,
      "Password reset Link",
      `password reset link ${url}`
    );

    //return response
    return res.json({
      success: true,
      message: "Email sent succesfully please check mail",
    });
  } catch (error) {
    return res.status(500).json({
        success:false,
        error: err.message ,
        message:"something went wrong"
    });
  }
};

//reset password
exports.resetPassword = async(req, res)=>{

    try {
        //fetch data 
        const {password, confirmPassword, token}= req.body;

        //validation
        if(password !==confirmPassword){
            return res.json({
                success:false,
                message:"password and confirm password does not match"
            })
        }

        //get user details
        const userDetails = await User.findOne({token:token})

        //if no entry -invalid token
        if(!userDetails){
            return res.json({
                success: false,
                message:"password reset Token is invalid"
            })
        }

        //time expiry of token
        if(userDetails.resetPasswordExpires < Date.now()){
            return  res.json({
                success : false,
                message :"Token Expired"
                });
        }
        
        //hash new password
        let hashedPassword =await bcrypt.hash(password,10);

        //update the password
        await User.findByIdAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
            );

        //return response
        return res.status(200).json({
            success: true,
            message:"password reseted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"something went wrong please try again"
        })
        
    }
}
