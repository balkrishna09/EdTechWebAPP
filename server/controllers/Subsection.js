const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');


//create subsection
exports.createSubSection = async(req, res)=>{

    try {        
        //fetch data
        const{sectionId, title, timeDuration, description}= req.body;

        //extract file/video
        const video = req.files.videoFile;

        //validation
        if(!sectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        
        //create subsection
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description: description,
            videoUrl:uploadDetails.secure_url,
        })

        //update section with this sub section objectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                                {$push:{
                                                                    subSections:subSectionDetails._id,
                                                                }},
                                                                {new:true}
                                                                );
        //HW log updated section here, after adding populate query

        //return response
        return res.status(200).json({
            success:true,
            message:"Sub section created successfully",
            data:updatedSection
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({

            success: false,
            message: 'Internal Server Error',
            error:error.message
        })
    }
}

//below HW
//update subsection
//delte subsection