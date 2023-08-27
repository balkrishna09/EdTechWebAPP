const Profile = require('../models/Profile');
const User = require("../models/User");

exports.updateProfile = async(req, res)=>{
    try {
        //get data
        const {gender, dateOfBirth="", about="", contactNumber } = req.body;

        //get userID
        const id = req.user.id;

        //validation
        if(!gender || !contactNumber || !id){
            return res.status(401).json({success:false, message: "Please fill all the fields"});
        };
        
        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId)

        //update profile 
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();
    
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
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        };

        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //delete user
        await User.findByIdAndDelete({_id:id});

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