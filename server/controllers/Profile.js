const Profile = require('../models/Profile');
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async(req, res)=>{
    try {
        //get data
        const { dateOfBirth="", about="", contactNumber } = req.body;

        //get userID
        const id = req.user.id;
        
        //find profile
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);


        //update profile 
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        // profile.gender = gender;
        profile.contactNumber = contactNumber;
        await profile.save();
    
        //return response
        return res.status(200).json({
            success:true,
            message:"Your profile has been updated successfully.",
            data:profileDetails
        })

        
    } catch (error) {
        return res.staus(500).json({
            success:false,
            message: "Internal Server Error",
            error:error.message
        })
    }
}


//delete account
exports.deleteAccount = async(req,res)=>{
    try {
        //get id
        const id = req.user.id

        //validation
        const user = await User.findById({_id:id});
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        };

        //delete profile
        await Profile.findByIdAndDelete({_id:user.userDetails});

        //delete user
        await user.findByIdAndDelete({_id:id});

        //return res
        return res.status(200).json({
            success:true,
            message:"You have deleted your account successfully."
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}

exports.getAllUserDetails = async(req,res)=>{
    try {

        //get id
        const id = req.user.id

        //validation 
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'No such user exists.'
                });
        };

        //return response
        return res.status(200).json({
            success: true,
            message: "Fetched all the details of this particular user.",
            data:userDetails
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Internal Server Error.'
        })
    }
}