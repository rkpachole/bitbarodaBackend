const { followUpStatusModel } = require("../models/followUpStatus.model")

exports.paginationFollowUpStatus = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await followUpStatusModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await followUpStatusModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.addFollowUpStatus = async (bodyData, email) => {
    try {
        const followUpStatus = await followUpStatusModel.findOne({ followUpStatusName: bodyData.name })
        // console.log(followUpStatus);
        if (!followUpStatus) {
            // const {} =  bodyData;
            const saveData = new followUpStatusModel(bodyData)
            saveData.email = email
            await saveData.save()
            return { status: true, subcode: 200, message: "followUpStatus added successfully ", data: saveData }
        } else {
            return { status: false, subcode: 400, message: "followUpStatus already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.removeFollowUpStatus = async (id) => {
    try {
        const data = await followUpStatusModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "followUpStatus Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}


exports.searchFollowUpStatus = async (bodyData) => {
    try {

        const data = await followUpStatusModel.find({ followUpStatusName: { $regex: bodyData.followUpStatusName, $options: 'i' } });

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

exports.activeFollowUpStatus = async (id) => {
    try {
        const data = await followUpStatusModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subcode: 200, message: "followUpStatus activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "followUpStatus deactivated successfully", data: data };
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


exports.editFollowUpStatus = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await followUpStatusModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "followUpStatus not found.", data: null };
        }
        return { status: true, subcode: 200, message: "followUpStatus updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}
exports.getOneFollowUpStatus = async (id) => {
    try {
        const data = await followUpStatusModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subcode: 200, message: "followUpStatus get successfully ", data: data }
        } else {
            return { status: false, subcode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}



exports.getAllFollowUpStatus = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const followUpStatus = await followUpStatusModel.find();

        // Filter the followUpStatus based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        followUpStatus.forEach(followUpStatus => {
            if (followUpStatus.isActive === true && followUpStatus.isDelete === false) {
                adminData.push(followUpStatus);
                usersData.push(followUpStatus);
            } else if (followUpStatus.isActive === false && followUpStatus.isDelete === false) {
                adminData.push(followUpStatus);
            }
        });

        if (adminData.length === 0) {
            // No followUpStatus exist for admin
            return { status: false, subcode: 400, message: "No followUpStatus found for admin.", data: [] };
        }

        // if (usersData.length === 0) {
        //     // No followUpStatus exist for user
        //     return { status: false, subcode: 400, message: "No followUpStatus found for user.", data: [] };
        // }

        adminData.reverse();
        usersData.reverse()
        return {
            status: true,
            subcode: 200,
            message: "followUpStatus retrieved successfully.",
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
