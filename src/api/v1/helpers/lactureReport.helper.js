const { lactureReportModel } = require("../models/lactureReport.model")

exports.paginationLactureReport = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await lactureReportModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await lactureReportModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.addLactureReport = async (bodyData, email) => {
    try {
        const lactureReport = await lactureReportModel.findOne({ lactureReportName: bodyData.name })
        // console.log(lactureReport);
        if (!lactureReport) {
            const {...data} =  bodyData;
            const saveData = new lactureReportModel(data)
            saveData.email = email
            await saveData.save()
            return { status: true, subcode: 200, message: "lactureReport added successfully ", data: saveData }
        } else {
            return { status: false, subcode: 400, message: "lactureReport already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.removeLactureReport = async (id) => {
    try {
        const data = await lactureReportModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "lactureReport Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}


exports.searchLactureReport = async (bodyData) => {
    try {

        const data = await lactureReportModel.find({ courseName: { $regex: bodyData.courseName, $options: 'i' } });

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

exports.activeLactureReport = async (id) => {
    try {
        const data = await lactureReportModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subcode: 200, message: "lactureReport activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "lactureReport deactivated successfully", data: data };
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


exports.editLactureReport = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await lactureReportModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "lactureReport not found.", data: null };
        }
        return { status: true, subcode: 200, message: "lactureReport updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}
exports.getOneLactureReport = async (id) => {
    try {
        const data = await lactureReportModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subcode: 200, message: "lactureReport get successfully ", data: data }
        } else {
            return { status: false, subcode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}


exports.getAllLactureReport = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const lactureReport = await lactureReportModel.find();

        // Filter the lactureReport based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        lactureReport.forEach(lactureReport => {
            if (lactureReport.isActive === true && lactureReport.isDelete === false) {
                adminData.push(lactureReport);
                usersData.push(lactureReport);
            } else if (lactureReport.isActive === false && lactureReport.isDelete === false) {
                adminData.push(lactureReport);
            }
        });

        if (adminData.length === 0) {
            // No lactureReport exist for admin
            return { status: false, subcode: 400, message: "No lactureReport found for admin.", data: [] };
        }

        // if (usersData.length === 0) {
        //     // No lactureReport exist for user
        //     return { status: false, subcode: 400, message: "No lactureReport found for user.", data: [] };
        // }

        adminData.reverse();
        usersData.reverse()
        return {
            status: true,
            subcode: 200,
            message: "lactureReport retrieved successfully.",
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
