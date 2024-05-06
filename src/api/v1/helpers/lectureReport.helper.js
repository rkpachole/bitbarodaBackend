const { lectureReportModel } = require("../models/lectureReport.model")

exports.paginationLectureReport = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await lectureReportModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await lectureReportModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subCode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}

exports.addLectureReport = async (bodyData, email) => {
    try {
        // const lectureReport = await lectureReportModel.findOne({ lectureReportName: bodyData.name })
        // // console.log(lectureReport);
        // if (!lectureReport) {
            const {...data} =  bodyData;
            const saveData = new lectureReportModel(data)
            saveData.email = email
            await saveData.save()
            return { status: true, subCode: 200, message: "lectureReport added successfully ", data: saveData }
        // } else {
        //     return { status: false, subCode: 400, message: "lectureReport already exist" }
        // }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.removeLectureReport = async (id) => {
    try {
        const data = await lectureReportModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subCode: 200, message: "lectureReport Deleted successfully ", data: data }
        else
            return { status: false, subCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}


exports.searchLectureReport = async (bodyData) => {
    try {

        const data = await lectureReportModel.find({ courseName: { $regex: bodyData.courseName, $options: 'i' } });

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

exports.activeLectureReport = async (id) => {
    try {
        const data = await lectureReportModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subCode: 200, message: "lectureReport activated successfully", data: data };
            } else {
                return { status: true, subCode: 200, message: "lectureReport deactivated successfully", data: data };
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


exports.editLectureReport = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await lectureReportModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subCode: 404, message: "lectureReport not found.", data: null };
        }
        return { status: true, subCode: 200, message: "lectureReport updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.getOneLectureReport = async (id) => {
    try {
        const data = await lectureReportModel.findOne({ _id: id })
        // console.log(data);
        if (data.isActive === true) {
            return { status: true, subCode: 200, message: "lectureReport get successfully ", data: data }
        } else {
            return { status: false, subCode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}


exports.getAllLectureReportByCourseId = async (id) => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const lectureReport = await lectureReportModel.find({courseId:id});
        // Filter the lectureReport based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        lectureReport.forEach(lectureReport => {
            if (lectureReport.isActive === true && lectureReport.isDelete === false) {
                adminData.push(lectureReport);
                usersData.push(lectureReport);
            } else if (lectureReport.isActive === false && lectureReport.isDelete === false) {
                adminData.push(lectureReport);
            }
        });

        if (adminData.length === 0) {
            // No lectureReport exist for admin
            return { status: false, subCode: 400, message: "No lectureReport found for admin.", data: [] };
        }

        // if (usersData.length === 0) {
        //     // No lectureReport exist for user
        //     return { status: false, subCode: 400, message: "No lectureReport found for user.", data: [] };
        // }

        adminData.reverse();
        usersData.reverse()
        return {
            status: true,
            subCode: 200,
            message: "lectureReport retrieved successfully.",
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

exports.getAllLectureReport = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const lectureReport = await lectureReportModel.find();

        // Filter the lectureReport based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        lectureReport.forEach(lectureReport => {
            if (lectureReport.isActive === true && lectureReport.isDelete === false) {
                adminData.push(lectureReport);
                usersData.push(lectureReport);
            } else if (lectureReport.isActive === false && lectureReport.isDelete === false) {
                adminData.push(lectureReport);
            }
        });

        if (adminData.length === 0) {
            // No lectureReport exist for admin
            return { status: false, subCode: 400, message: "No lectureReport found for admin.", data: [] };
        }

        // if (usersData.length === 0) {
        //     // No lectureReport exist for user
        //     return { status: false, subCode: 400, message: "No lectureReport found for user.", data: [] };
        // }

        adminData.reverse();
        usersData.reverse()
        return {
            status: true,
            subCode: 200,
            message: "lectureReport retrieved successfully.",
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
