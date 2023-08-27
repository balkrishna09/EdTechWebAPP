// const Category = require("../models/Category");
const Category = require("../models/Category");
const category = require("../models/Category");

//create Category ka handler function
exports.createCourse = async(req, res)=>{
    try {
        const {name, description} = req.body;

        if(!name || !description){
            return res.status(400).json({message: "Please enter all fields"});
        }

        //create entry in DB
        const categoryDetails = await category.create({
            name:name,
            description:description
        });
        console.log(categoryDetails);
        return res.status(200).json({
            successs: true,
            message: "category created successfully"
        })
        
    } catch (error) {
        console.log(error);
        return  res.status(400).json({
            success:false,
            message: error.message,
        })
    }
}

exports.showAllCategory = async(req,res)=>{
    try {
        const allCategory = await Category.find({},{name:true, description:true})
        console.log("all Category",allCategory[1]);
        return   res.status(200).send({"success":true,"data":allCategory}); 
    } catch (error) {  
        console.log(error);
        return   res.status(500).json({success: false , msg:"Internal Server Error"})
        
    }
}