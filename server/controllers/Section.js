const Section = require("../models/Section");
const Course = require("../models/Course");


exports.createSection = async(req, res)=>{
    try {
        
        //data fetch
        const {sectionName , courseId} = req.body

        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing properties"
            })
        };

        //create section
        const newSection = await Section.create({sectionName})


        //insert section objectid in course schema
        const updatedCourse =   await Course.findByIdAndUpdate(courseId, 
                                                                {$push:{courseContent:newSection._id}},
                                                                {new:true}
                                                            )
                                                            .populate({
                                                                path:'courseContent',
                                                                populate :{
                                                                    path :"subSection",
                                                                    },
                                                            });
        // HW use populate to replace section and subsection in the updatedCourse

        return res.status(200).json({
            success:true,
            message:"Section Created successfuly",
            data:updatedCourse
        })
    } catch (error) {
        return res.status(500).json({
            success:false, 
            message:"Server Error unable to create section Right now try agai later",
            error:error.message
        })
        
    }
};



exports.updateSection = async(req, res)=>{
    try {
        //data input
        const {sectionName, sectionId} = req.body;

        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing properties"
            })
        };


        //update the data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        //return response
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfuly",
            data:section
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

exports.deleteSection = async(req,res)=>{
    try {
        //fetch id from url parameter
        const {sectionId} = req.body;

        //validation
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing property courseId"
                });
        }

        //delete
        await Section.findByIdAndDelete(sectionId);

        // todo do we need to delete the entry from course schema 

        //return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}