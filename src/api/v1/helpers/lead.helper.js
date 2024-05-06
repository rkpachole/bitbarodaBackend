const { leadModel } = require('../models/Lead.model')
const { courseModel } = require('../models/course.model')

exports.addLead = async (bodyData) => {
    try {
        const { ...data } = bodyData
        const saveData = new leadModel(data)
        saveData.fullName = bodyData.firstName + ' ' + bodyData.fathersName + ' ' + bodyData.surname
        console.log(saveData.fullName);
        if (saveData.firstName !== "" && saveData.fathersName !== "" && saveData.surname !== "" && saveData)
            saveData.isSecuired = true
        await saveData.save()
        return { status: true, subCode: 200, message: "Lead added successfully ", data: saveData }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}

exports.DuplicateData = async (bodyData) => {
    try {
        const { ...data } = bodyData
        const nameCheck = await leadModel.findOne({ fullName: bodyData.fullName })
        const phoneCheck = await leadModel.findOne({ phone: bodyData.phone })
        const whatsappCheck = await leadModel.findOne({ whatsapp: bodyData.whatsapp })
        if (nameCheck || phoneCheck || whatsappCheck)
            return { status: false, subCode: 400, message: "Lead already exist ", data: data }
        else
            return { status: true, subCode: 200, message: "successfully", data: data }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}

exports.removeLead = async (id) => {
    try {
        const data = await leadModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subCode: 200, message: "lead Deleted successfully ", data: data }
        else
            return { status: false, subCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.searchLead = async (bodyData) => {
    try {
        // Use Mongoose to find CareerTransitionss that match the search term in their CareerTransitionsName field
        const data = await leadModel.find({ fullName: { $regex: bodyData.fullName, $options: 'i' } });
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

exports.searchLeadByMobile = async (bodyData) => {
    try {
        // Use Mongoose to find CareerTransitionss that match the search term in their CareerTransitionsName field
        const data = await leadModel.find({ phone: { $regex: bodyData.phone, $options: 'i' } });
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

exports.editLead = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData;

        const data = await leadModel.findByIdAndUpdate(
            { _id: id },
            newData,
            { new: true }
        );
        // console.log(data);
        if (data.isDelete === true) {
            // Lead with the given id not found
            return { status: false, subCode: 404, message: "Lead not found.", data: null };
        }
        return { status: true, subCode: 200, message: "Lead updated successfully.", data: data };
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
};

exports.getOneLead = async (id) => {
    try {
        const data = await leadModel.findOne({ _id: id })
        if (data.isActive === true) { return { status: true, subCode: 200, message: "Lead get successfully ", data: data } }
        else { return { status: false, subCode: 400, message: "data not exist" } }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.getAllLead = async () => {
    try {
        const Leads = await leadModel.find();
        // Filter the Leads based on isActive and isDelete conditions
        const adminLeads = [];
        const userLeads = [];
        Leads.forEach(Lead => {
            if (Lead.isActive === true && Lead.isDelete === false) {
                adminLeads.push(Lead);
                userLeads.push(Lead);
            } else if (Lead.isActive === false && Lead.isDelete === false) {
                adminLeads.push(Lead);
            }
        });
        if (adminLeads.length === 0) {
            // No Leads exist for admin
            return { status: false, subCode: 400, message: "No Leads found for admin.", data: [] };
        }
        // if (userLeads.length === 0) {
        //     // No Leads exist for user
        //     return { status: false, subCode: 400, message: "No Leads found for user.", data: [] };
        // }
        return {
            status: true,
            subCode: 200,
            message: "Leads retrieved successfully.",
            data: {
                adminLeads,
                userLeads
            }
        }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}

exports.paginationLead = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await leadModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await leadModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subCode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}



// Define your function as an asynchronous function
exports.leadValue = async (bodyData) => {
    try {
        const courseIds = bodyData;
        let fees = 0;
        for (const courseId of courseIds) {
            try {
                const data = await courseModel.findOne({ _id: courseId })
                if (bodyData.courseMode === "online") {
                    fees += data.onlineFees;
                }
                if (bodyData.courseMode === "offline" || bodyData.courseMode === "both") {
                    fees += data.offlineFees;
                }

            } catch (error) {
                console.error(`Error fetching data for ID ${courseId}:`, error.message);
                // Handle the error, e.g., continue to the next courseId
                continue;
            }
        }

        console.log("fees:", fees);

        return {
            status: true,
            subCode: 200,
            message: "Lead value calculate.",
            data: fees
        };
    } catch (error) {
        console.error("Helper Error:", error);

        return {
            status: false,
            subCode: 400,
            message: error.message
        };
    }
};

