const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//sendotp
exports.sendOTP = async (req, res) => {
  try {
    //fetch email from user body
    const { email } = req.body;

    //check if user already exist or not
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "user is already exist",
      });
    }

    //generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP Generated ", otp);

    //check unique otp
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = {email,otp};

    //create an entry for OTP in DB
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    //return response 
    res.status(200).json({
        success : true,
        message:'OTP sent Succesfully'
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
        error:true,
        message:error.message,
    })
  }
};



//signup
exports.signUp = async(req,res)=>{
    try {

        //data fetch from request body
        const {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          accountType,
          contactNumber,
          otp
        } = req.body


        //validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
          return res.status(403).json({
            success: false,
            message: 'All fields are required'
          })
        } 

        // dono password match krlo 
        if(password !== confirmPassword){
          return  res.status(400).json({
            success:false,
            message:"Password and Confirm Password does not matched"
            });
        }


        // chech user already exist or not
        const existingUser = await User.findOne({email});
        if (existingUser){
          return res.status(400).json({
            success: false,
            message:'User Already Exist',
          });
        }



        //find most recent OTP stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp)
        //validate OTP
        if(recentOtp.length==0){
          return   res.status(502).json({
            success : false ,
            error :"OTP is expired or Not Found",
            });
        }else if(otp !== recentOtp.otp){
          return res.status(400).json({
            sucess: false,
            mesage:"Invalid OTP"
          })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
      
        //store data in db

        const profileDetails = await Profile.create({
          gender:null,
          dateOfBirth: null,
          about:null,
          contactNumber:null,
        })

        const user = await User.create({
          firstName,
          lastName,
          email,
          contactNumber,
          password: hashedPassword,
          accountType,
          additionalDetails:profileDetails._id,
          image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`

        })



        //return res
        return res.status(200).json({
          success:true,
          message:"User registered successfully",
          user,
        })
    
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success:false,
          message:"User cannot be registered please try one again"
        });
    }
}

//login
exports.login = async(req,res)=>{
  try {
    //get data from req body
    let{email , password}=req.body;
    if(!email || !password){
      
    //validation of data
    return res.status(500).json({
      success : false,
      message:"Please provide all the details"
    })
  }

    //check user exist or not 
    const user = await User.findOne({email}).populate("additionalDetails");
    if(!user ){
      return res.status(400).json({
        success:false,
        message:'Email does not exists, please signup'
      })
    }

    //generate JWT token, after password matching
    if(await bcrypt.compare(password, user.password)){ 

      const payload = {
        email : user.email,
        id: user._id,
        accountType: user.accountType,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:"2h",
      });

      user.token= token;  
      user.password = undefined;
          
      //create cookie and send response 
    const options = {
      expires: new Date(Dare.now()+ 3*24*60*60*1000),
      httpOnly:true
    }
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Logged in Successfully"
    })    

    }
    else{
      return res.status(400).json({
        success:false,
        message:'Password incorrect'
      })
    }
 
} catch (error) {
  console.log(error);
  return res.status(400).json({
    success:false,
    message:"something went wrong",
    error: error.mesage,
  })
    
  }
}

//change password
exports.changePassword = async(req, res)=>{
  try {
    
  //get data from req body
  
  //get old password, new password, confirm new password
  //validation
  //update password in DB
  //send mail password updated
  //return response

  } catch (error) {
    
  }

}