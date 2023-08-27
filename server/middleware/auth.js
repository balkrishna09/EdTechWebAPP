const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").consif();
const User = require("../models/User");


//auth
exports.auth= async (req, res, next)=>{
    try {
        //extract token
        const token = req.body.token 
        || req.cookies.token 
        || req.header("Authorization").replace("Bearer ","");

        //token missing
        if(!token){
            return res.staus(400).json({
                success: false,
                message: "token is missing"
            })
        }

        //verify token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log('decode', decode);
            req.user = decode;
        }
        catch(err){
            return res.status(400).jsonn({
                success :false ,
                message :"invalid Token"
            })
        }

        next();


    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"something went wrong while validating token"
        })
        
    }

}


//isStudent
exports.isStudent = async(req, res, next)=>{
    try {
        if(req.user.accountType !== "Student"){
            return res.status(400).json({
                succes:false,
                message:"Only student allowed"
            })
        }

        next();
              
    } catch (error) {
        return res.status(500).json({
            sucess:false,
            error:'server Error or user role cannot be verified'
        });
    }

}

//isAdmin
exports.isAdminAdmin = async(req, res, next)=>{
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(400).json({
                succes:false,
                message:"Only admin allowed"
            })
        }

        next();
              
    } catch (error) {
        return res.status(500).json({
            sucess:false,
            error:'server Error or user role cannot be verified'
        });
    }

}

//isInstructor
exports.isInstructor = async(req, res, next)=>{
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(400).json({
                succes:false,
                message:"Only Instructor allowed"
            })
        }

        next();
              
    } catch (error) {
        return res.status(500).json({
            sucess:false,
            error:'server Error or user role cannot be verified'
        });
    }

}