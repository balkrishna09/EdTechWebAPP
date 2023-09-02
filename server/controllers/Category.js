// const Category = require("../models/Category");
const Category = require("../models/Category");
const category = require("../models/Category");

//create Category ka handler function
exports.createCategory = async(req, res)=>{
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

exports.showAllCategories = async(req,res)=>{
    try {
        const allCategory = await Category.find({},{name:true, description:true})
        console.log("all Category",allCategory[1]);
        return   res.status(200).send({"success":true,"data":allCategory}); 
    } catch (error) {  
        console.log(error);
        return   res.status(500).json({success: false , msg:"Internal Server Error"})
        
    }
}

exports.categoryPageDetails = async (req, res) => {
	try {
		const { categoryId } = req.body;

		// Get courses for the specified category
		const selectedCategory = await Category.findById(categoryId)
			.populate("courses")
			.exec();
		console.log(selectedCategory);
		// Handle the case when the category is not found
		if (!selectedCategory) {
			console.log("Category not found.");
			return res
				.status(404)
				.json({ success: false, message: "Category not found" });
		}
		// Handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}

		const selectedCourses = selectedCategory.courses;

		// Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		}).populate("courses");
		let differentCourses = [];
		for (const category of categoriesExceptSelected) {
			differentCourses.push(...category.courses);
		}

		// Get top-selling courses across all categories
		const allCategories = await Category.find().populate("courses");
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses: mostSellingCourses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};