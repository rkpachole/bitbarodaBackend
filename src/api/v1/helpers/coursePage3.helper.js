const { coursePage3Model } = require("../models/coursePage3.model")

exports.paginationCoursePage3 = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await coursePage3Model.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const data = await coursePage3Model.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subCode: 200, message: "Pagination done successfully.", data: { data, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}

exports.addCoursePage3 = async (bodyData, email) => {
    try {
        const coursePage3 = await coursePage3Model.findOne({ courseName: bodyData.courseName })
        // console.log(coursePage3);
        if (!coursePage3) {
            const { ...data } = bodyData;
            const saveData = new coursePage3Model(data)
            saveData.email = email
            await saveData.save()
            return { status: true, subCode: 200, message: "coursePage3 added successfully ", data: saveData }
        } else {
            return { status: false, subCode: 400, message: "coursePage3 already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.removeCoursePage3 = async (id) => {
    try {
        const data = await coursePage3Model.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subCode: 200, message: "coursePage3 Deleted successfully ", data: data }
        else
            return { status: false, subCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.searchCoursePage3 = async (bodyData) => {
    try {
        const data = await coursePage3Model.find({ titel: { $regex: bodyData.titel, $options: 'i' } });
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

exports.activeCoursePage3 = async (id) => {
    try {
        const data = await coursePage3Model.findOne({ _id: id, isDelete: false });
        if (data) {
            data.isActive = !data.isActive; // Toggle isActive value
            await data.save();
            if (data.isActive) {
                return { status: true, subCode: 200, message: "coursePage3 activated successfully", data: data };
            } else {
                return { status: true, subCode: 200, message: "coursePage3 deactivated successfully", data: data };
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

exports.editCoursePage3 = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await coursePage3Model.findOneAndUpdate(
            { courseId: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subCode: 404, message: "coursePage3 not found.", data: null };
        }
        return { status: true, subCode: 200, message: "coursePage3 updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}


exports.getOneCoursePage3 = async (id) => {
    try {
        const data = await coursePage3Model.findOne({ courseId:id })
        if (data.isActive === true) {
            return { status: true, subCode: 200, message: "coursePage3 get successfully ", data: data }
        } else {
            return { status: false, subCode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}


exports.getAllCoursePage3 = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const coursePage3 = await coursePage3Model.find();
        // Filter the coursePage3 based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        coursePage3.forEach(coursePage3 => {
            if (coursePage3.isActive === true && coursePage3.isDelete === false) {
                adminData.push(coursePage3);
                usersData.push(coursePage3);
            } else if (coursePage3.isActive === false && coursePage3.isDelete === false) {
                adminData.push(coursePage3);
            }
        });
        if (adminData.length === 0) {
            // No coursePage3 exist for admin
            return { status: false, subCode: 400, message: "No coursePage3 found for admin.", data: [] };
        }
        // if (usersData.length === 0) {
        //     // No coursePage3 exist for user
        //     return { status: false, subCode: 400, message: "No coursePage3 found for user.", data: [] };
        // }
        adminData.reverse();
        usersData.reverse()
        return {
            status: true,
            subCode: 200,
            message: "coursePage3 retrieved successfully.",
            data: {
                adminData,
                usersData
            }
        }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
};
