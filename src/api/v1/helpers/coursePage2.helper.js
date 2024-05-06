const { coursePage2Model } = require("../models/coursePage2. model")


exports.paginationCoursePage2 = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await coursePage2Model.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await coursePage2Model.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subCode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}

exports.addCoursePage2 = async (bodyData, email) => {
    try {
        const coursePage2 = await coursePage2Model.findOne({ courseName: bodyData.courseName })
        // console.log(coursePage2);
        if (!coursePage2) {
            const { ...data } = bodyData;
            const saveData = new coursePage2Model(data)
            saveData.email = email
            await saveData.save()
            return { status: true, subCode: 200, message: "coursePage2 added successfully ", data: saveData }
        } else {
            return { status: false, subCode: 400, message: "coursePage2 already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.removeCoursePage2 = async (id) => {
    try {
        const data = await coursePage2Model.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subCode: 200, message: "coursePage2 Deleted successfully ", data: data }
        else
            return { status: false, subCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.searchCoursePage2 = async (bodyData) => {
    try {

        const data = await coursePage2Model.find({ titel: { $regex: bodyData.titel, $options: 'i' } });

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

exports.activeCoursePage2 = async (id) => {
    try {
        const data = await coursePage2Model.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subCode: 200, message: "coursePage2 activated successfully", data: data };
            } else {
                return { status: true, subCode: 200, message: "coursePage2 deactivated successfully", data: data };
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


exports.editCoursePage2 = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await coursePage2Model.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subCode: 404, message: "coursePage2 not found.", data: null };
        }
        return { status: true, subCode: 200, message: "coursePage2 updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}
exports.getOneCoursePage2 = async (id) => {
    try {
        const data = await coursePage2Model.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subCode: 200, message: "coursePage2 get successfully ", data: data }
        } else {
            return { status: false, subCode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}


exports.getAllCoursePage2 = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const coursePage2 = await coursePage2Model.find();
        // Filter the coursePage2 based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        coursePage2.forEach(coursePage2 => {
            if (coursePage2.isActive === true && coursePage2.isDelete === false) {
                adminData.push(coursePage2);
                usersData.push(coursePage2);
            } else if (coursePage2.isActive === false && coursePage2.isDelete === false) {
                adminData.push(coursePage2);
            }
        });

        if (adminData.length === 0) {
            // No coursePage2 exist for admin
            return { status: false, subCode: 400, message: "No coursePage2 found for admin.", data: [] };
        }

        // if (usersData.length === 0) {
        //     // No coursePage2 exist for user
        //     return { status: false, subCode: 400, message: "No coursePage2 found for user.", data: [] };
        // }

        adminData.reverse();
        usersData.reverse()
        return {
            status: true,
            subCode: 200,
            message: "coursePage2 retrieved successfully.",
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
