const { subCourseModel } = require("../models/subcourse.model")

exports.paginationSubcourse = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await subCourseModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await subCourseModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}


exports.addSubcourse = async (bodyData, email) => {
    try {
        const subCourse = await subCourseModel.findOne({ subCourseName: bodyData.name })
        // console.log(subCourse);
        if (!subCourse) {
            const { ...data } = bodyData;
            const saveData = new subCourseModel(data)
            saveData.email = email
            await saveData.save()
            return { status: true, subcode: 200, message: "subCourse added successfully ", data: saveData }
        } else {
            return { status: false, subcode: 400, message: "subCourse already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.removeSubcourse = async (id) => {
    try {
        const data = await subCourseModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "subCourse Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.searchSubcourse = async (bodyData) => {
    try {

        const data = await subCourseModel.find({ subcourseName: { $regex: bodyData.subcourseName, $options: 'i' } });

        if (data || data.length) {
            return {
                status: true,
                subcode: 200,
                message: "data retrieved successfully.",
                data: data
            };
        }
        return {
            status: false,
            subcode: 404,
            message: "No data found with the given search term.",
            data: []
        };
    } catch (error) {
        console.error("Helper Err:", error);
        return {
            status: false,
            subcode: 400,
            message: error.message,
            data: []
        };
    }
}

exports.activeSubcourse = async (id) => {
    try {
        const data = await subCourseModel.findOne({ _id: id, isDelete: false });
        if (data) {
            data.isActive = !data.isActive; // Toggle isActive value
            await data.save();
            if (data.isActive) {
                return { status: true, subcode: 200, message: "subCourse activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "subCourse deactivated successfully", data: data };
            }
        }
        return {
            status: false, subcode: 400, message: "data not found", data: data
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
};


exports.editSubcourse = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await subCourseModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "subCourse not found.", data: null };
        }
        return { status: true, subcode: 200, message: "subCourse updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}
exports.getOneSubcourse = async (id) => {
    try {
        const data = await subCourseModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subcode: 200, message: "subCourse get successfully ", data: data }
        } else {
            return { status: false, subcode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}


exports.getAllSubcourse = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const subCourse = await subCourseModel.find();

        // Filter the subCourse based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        subCourse.forEach(subCourse => {
            if (subCourse.isActive === true && subCourse.isDelete === false) {
                adminData.push(subCourse);
                usersData.push(subCourse);
            } else if (subCourse.isActive === false && subCourse.isDelete === false) {
                adminData.push(subCourse);
            }
        });

        if (adminData.length === 0) {
            // No subCourse exist for admin
            return { status: false, subcode: 400, message: "No subCourse found for admin.", data: [] };
        }

        // if (usersData.length === 0) {
        //     // No subCourse exist for user
        //     return { status: false, subcode: 400, message: "No subCourse found for user.", data: [] };
        // }

        adminData.reverse();
        usersData.reverse()
        return {
            status: true,
            subcode: 200,
            message: "subCourse retrieved successfully.",
            data: {
                adminData,
                usersData
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
};
