const { categoryModel } = require('../models/category.model')
const { subCategoryModel } = require('../models/subCategory.model')

exports.paginationSubCategory = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await subCategoryModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await subCategoryModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subCode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}


exports.addSubCategory = async (bodyData, email) => {
    try {
        const { subCategoryName, categoryName } = bodyData
        console.log(bodyData);
        const data = { email: email, category: categoryName, subCategoryName: subCategoryName }
        const saveData = new subCategoryModel(data)
        await saveData.save()
        return { status: true, subCode: 200, message: "category added successfully ", data: saveData }

    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.removeSubCategory = async (id) => {
    try {
        const data = await subCategoryModel.findByIdAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subCode: 200, message: "SubCategory Deleted successfully ", data: data }
        else
            return { status: false, subCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.searchSubCategory = async (bodyData) => {
    try {
        const data = await subCategoryModel.find({ subCategoryName: { $regex: bodyData.subCategoryName, $options: 'i' } });
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

exports.activeSubCategory = async (id) => {
    try {
        const data = await subCategoryModel.findOne({ _id: id, isDelete: false });
        if (data) {
            data.isActive = !data.isActive; // Toggle isActive value
            await data.save();
            if (data.isActive) {
                return { status: true, subCode: 200, message: "course activated successfully", data: data };
            } else {
                return { status: true, subCode: 200, message: "course deactivated successfully", data: data };
            }
        }
        return {
            status: false, subCode: 400, message: "data not found", data: data
        }

    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.editSubCategory = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData

        const data = await subCategoryModel.findByIdAndUpdate(
            { _id: id },
            newData,
            { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subCode: 404, message: "subCategory not found.", data: null };
        }
        return { status: true, subCode: 200, message: "category updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.getOneSubCategory = async (id) => {
    try {
        const data = await subCategoryModel.findOne({ _id: id })
        if (data.isActive === true) { return { status: true, subCode: 200, message: "category get successfully ", data: data } }
        else { return { status: false, subCode: 400, message: "data not exist" } }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.getAllSubCategory = async () => {
    try {
        const subCategories = await subCategoryModel.find();
        // Filter the subcategories based on isActive and isDelete conditions
        const adminData = [];
        const userData = [];
        subCategories.forEach(subCategory => {
            if (subCategory.isActive === true && subCategory.isDelete === false) {
                adminData.push(subCategory);
                userData.push(subCategory);
            } else if (subCategory.isActive === false && subCategory.isDelete === false) {
                adminData.push(subCategory);
            }
        });
        if (adminData.length === 0) {
            // No subcategories exist for admin
            return { status: false, subCode: 400, message: "No subcategories found for admin.", data: [] };
        }
        // if (userData.length === 0) {
        //     // No subcategories exist for user
        //     return { status: false, subCode: 400, message: "No subcategories found for user.", data: [] };
        // }
        adminData.reverse();
        userData.reverse()
        return {
            status: true,
            subCode: 200,
            message: "Subcategories retrieved successfully.",
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

