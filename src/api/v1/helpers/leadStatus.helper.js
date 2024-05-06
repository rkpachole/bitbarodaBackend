const { leadStatusModel } = require("../models/leadStatus.model")

exports.paginationLeadStatus = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await leadStatusModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await leadStatusModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.addLeadStatus = async (bodyData, email) => {
    try {
        const leadStatus = await leadStatusModel.findOne({ leadStatusName: bodyData.name })
        // console.log(leadStatus);
        if (!leadStatus) {
            // const {} =  bodyData;
            const saveData = new leadStatusModel(bodyData)
            saveData.email = email
            await saveData.save()
            return { status: true, subcode: 200, message: "leadStatus added successfully ", data: saveData }
        } else {
            return { status: false, subcode: 400, message: "leadStatus already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.removeLeadStatus = async (id) => {
    try {
        const data = await leadStatusModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "leadStatus Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}


exports.searchLeadStatus = async (bodyData) => {
    try {

        const data = await leadStatusModel.find({ leadStatusName: { $regex: bodyData.leadStatusName, $options: 'i' } });

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

exports.activeLeadStatus = async (id) => {
    try {
        const data = await leadStatusModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subcode: 200, message: "leadStatus activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "leadStatus deactivated successfully", data: data };
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


exports.editLeadStatus = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await leadStatusModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "leadStatus not found.", data: null };
        }
        return { status: true, subcode: 200, message: "leadStatus updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}
exports.getOneLeadStatus = async (id) => {
    try {
        const data = await leadStatusModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subcode: 200, message: "leadStatus get successfully ", data: data }
        } else {
            return { status: false, subcode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}



exports.getAllLeadStatus = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const leadStatus = await leadStatusModel.find();

        // Filter the leadStatus based on isActive and isDelete conditions
        const adminleadStatus = [];
        const userleadStatus = [];
        leadStatus.forEach(leadStatus => {
            if (leadStatus.isActive === true && leadStatus.isDelete === false) {
                adminleadStatus.push(leadStatus);
                userleadStatus.push(leadStatus);
            } else if (leadStatus.isActive === false && leadStatus.isDelete === false) {
                adminleadStatus.push(leadStatus);
            }
        });

        if (adminleadStatus.length === 0) {
            // No leadStatus exist for admin
            return { status: false, subcode: 400, message: "No leadStatus found for admin.", data: [] };
        }

        // if (userleadStatus.length === 0) {
        //     // No leadStatus exist for user
        //     return { status: false, subcode: 400, message: "No leadStatus found for user.", data: [] };
        // }
        adminleadStatus.reverse();
        userleadStatus.reverse()
        return {
            status: true,
            subcode: 200,
            message: "leadStatus retrieved successfully.",
            data: {
                adminleadStatus,
                userleadStatus
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
};
