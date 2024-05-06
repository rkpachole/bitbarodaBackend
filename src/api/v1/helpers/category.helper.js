const { categoryModel } = require('../models/category.model')

exports.paginationCategory = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await categoryModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await categoryModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subCode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}

exports.addCategory = async (bodyData, email) => {
    try {
        const category = await categoryModel.findOne({ categoryName: bodyData.categoryName })
        // console.log(category);
        if (!category) {
            const data = { email: email, categoryName: bodyData.categoryName }
            const saveData = new categoryModel(data)
            await saveData.save()
            return { status: true, subCode: 200, message: "category added successfully ", data: saveData }
        } else {
            return { status: false, subCode: 400, message: "category already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.removeCategory = async (id) => {
    try {
        const data = await categoryModel.findOneAndUpdate(
            { _id: id, isDelete:false},
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subCode: 200, message: "category Deleted successfully ", data: data }
        else
            return { status: false, subCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
       
}

exports.searchCategory = async (bodyData) => {
    try {


        const data = await categoryModel.find({ categoryName: { $regex: bodyData.categoryName, $options: 'i' } });
        if (data || data.length) {
            return {
                status: true,
                subCode: 200,
                message: "data retrieved successfully.",
                data: data
            };
        }
        return {
            status: false,
            subCode: 404,
            message: "No data found with the given search term.",
            data: []
        };
    } catch (error) {
        console.error("Helper Err:", error);
        return {
            status: false,
            subCode: 400,
            message: error.message,
            data: []
        };
    }
}

exports.activeCategory = async (id) => {
    try {
        const data = await categoryModel.findOne({ _id: id, isDelete: false });
         if(data) {
        data.isActive = !data.isActive; // Toggle isActive value

        await data.save();

        if (data.isActive) {
            return { status: true, subCode: 200, message: "Category activated successfully", data: data };
        } else {
            return { status: true, subCode: 200, message: "Category deactivated successfully", data: data };
        }
    }
        return {
            status: false, subCode: 400, message: "data not found", data: data
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
};


exports.editCategory = async (bodyData, id) => {
    try {
        const data = await categoryModel.findOneAndUpdate(
            { _id: id },
            { categoryName: bodyData.categoryName },
            { new: true, select: '-_id -__v  -isActive' }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subCode: 404, message: "category not found.", data: null };
        }
        return { status: true, subCode: 200, message: "category updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}
exports.getOneCategory = async (id) => {
    try {
        const data = await categoryModel.findOne({ _id: id })
            if (data.isActive === true) 
            { 
                return { status: true, subCode: 200, message: "category get successfully ", data: data } 
        } else { 
                return { status: false, subCode: 400, message: "data not exist" }
            }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}



exports.getAllCategory = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const categories = await categoryModel.find();

        // Filter the categories based on isActive and isDelete conditions
        const adminData = [];
        const userData = [];
        categories.forEach(category => {
            if (category.isActive === true && category.isDelete === false ) {
                adminData.push(category);
                userData.push(category);
            } else if (category.isActive === false && category.isDelete === false) {
                adminData.push(category);
            }
        });
        if (adminData.length === 0) {
            // No categories exist for admin
            return { status: false, subCode: 400, message: "No categories found for admin.", data: [] };
        }

        // if (userData.length === 0) {
        //     // No categories exist for user
        //     return { status: false, subCode: 400, message: "No categories found for user.", data: [] };
        // }
        adminData.reverse();
        userData.reverse();
        return {
            status: true,
            subCode: 200,
            message: "Categories retrieved successfully.",
            data: {
                adminData,
                userData                
            }
        }       
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
};