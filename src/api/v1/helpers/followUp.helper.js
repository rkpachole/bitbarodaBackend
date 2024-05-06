const { followUpModel } = require("../models/followUp.model")
const moment = require('moment');
const { leadModel } = require('../models/Lead.model')

exports.paginationFollowUp = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await followUpModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await followUpModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subCode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}

exports.addFollowUp = async (bodyData, email) => {
    try {
        // const followUp = await followUpModel.findOne()
        // // console.log(followUp);
        // if (!followUp) {            // const {} =  bodyData;
          
        const currentDate = moment().format('DD/MM/YYYY');
        // console.log(currentDate);
        if (bodyData.nextFollowUPDate === currentDate || bodyData.nextFollowUPDate === bodyData.followUpDate) {
            return {
                status: false,
                subCode: 400,
                message: "Please enter the next day's date.",
            };
        }
            const saveData = new followUpModel(bodyData)
            saveData.email = email
            await saveData.save()
            const lead =  await leadModel.findOneAndUpdate(
               { _id: bodyData.leadId, isDelete: false },
                { latestRemark: bodyData.latestRemark, 
                    lastFollowUpDate: bodyData.followUpDate, nextFollowUPDate: bodyData.nextFollowUPDate, followUPStatus: bodyData.followUPStatus},
                { new: true }
                );
                console.log(bodyData.followUPStatus.followUPStatusName)
                
        lead.save()
            if (bodyData.followUPStatus.followUpStatusName =="walked-in"){
             const lead1 = await leadModel.findOneAndUpdate(
                    { _id: bodyData.leadId, isDelete: false },
                    {
                        WalkedInStatus:true
                    },
                    { new: true }
                );
                lead1.save()
            }
        return { status: true, subCode: 200, message: "followUp added successfully ", data: saveData }
        // } else {
        //     return {status: false, subCode: 400, message: "followUp already exist" }
        // }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.removeFollowUp = async (id) => {
    try {
        const data = await followUpModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subCode: 200, message: "followUp Deleted successfully ", data: data }
        else
            return { status: false, subCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}


exports.searchFollowUp = async (bodyData) => {
    try {
        const nm = bodyData.followUPStatusName
        const query = {
            'followUPStatus.followUpStatusName': { $regex: nm, $options: 'i' }
        };
        const data = await followUpModel.find(query);
        // console.log(data);
        if (data || data.length) {
            return {
                status: true,
                subCode: 200,
                message: "data retrieved successfully.",
                data: data
            };
        }
        return {
            status : false,
            subCode: 404,
            message: "No data found with the given search term.",
            data: []
        };
    } catch (error) {
        console.error("Helper Err:", error);
        return {
            status : false,
            subCode: 400,
            message: error.message,
            data: []
        };
    }
}

// exports.searchFollowUp = async (bodyData) => {
//     try {
//         let searchCriteria = {};

//         if (bodyData.nextFollowUpDate) {
//             searchCriteria = {
//                 ...searchCriteria,
//                 nextFollowUpDate: { $regex: bodyData.nextFollowUpDate, $options: 'i' }
//             };
//         } else if (bodyData.lastFollowUpDate) {
//             searchCriteria = {
//                 ...searchCriteria,
//                 followUpDate: { $regex: bodyData.lastFollowUpDate, $options: 'i' }
//             };
//         } else if (bodyData.followUpStatus) {
//             const name = bodyData.followUpStatus.followUPStatusName
//             searchCriteria = {
//                 ...searchCriteria,
//                 followUpStatusName: { $regex: name, $options: 'i' }
//             };
//         } else {
//             return {
//                 status: false,
//                 subCode: 400,
//                 message: "No valid search criteria provided.",
//                 data: []
//             };
//         }

//         const data = await followUpModel.find(searchCriteria);

//         if (data && data.length) {
//             return {
//                 status: true,
//                 subCode: 200,
//                 message: "Data retrieved successfully.",
//                 data: data
//             };
//         }
//         return {
//             status: false,
//             subCode: 404,
//             message: "No data found with the given search criteria.",
//             data: []
//         };
//     } catch (error) {
//         console.error("Helper Err:", error);
//         return {
//             status: false,
//             subCode: 400,
//             message: error.message,
//             data: []
//         };
//     }
// };


exports.activeFollowUp = async (id) => {
    try {
        const data = await followUpModel.findOne({ _id: id, isDelete: false });
        if (data) {
            data.isActive = !data.isActive; // Toggle isActive value
            await data.save();
            if (data.isActive) {
                return { status: true, subCode: 200, message: "followUp activated successfully", data: data };
            } else {
                return { status: true, subCode: 200, message: "followUp deactivated successfully", data: data };
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


exports.editFollowUp = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await followUpModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subCode: 404, message: "followUp not found.", data: null };
        }
        return { status: true, subCode: 200, message: "followUp updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.getOneFollowUp = async (id) => {
    try {
        const data = await followUpModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subCode: 200, message: "followUp get successfully ", data: data }
        } else {
            return { status: false, subCode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.getFollowUpByLeadId = async (id) => {
    try {
        const data = await followUpModel.find({
            leadId: id, isDelete: false
        })
        if (data) {
            return { status: true, subCode: 200, message: "followUp get successfully ", data: data }
        } else {
            return { status: false, subCode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.getAllFollowUp = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const followUp = await followUpModel.find();
        // Filter the followUp based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        followUp.forEach(followUp => {
            if (followUp.isActive === true && followUp.isDelete === false) {
                adminData.push(followUp);
                usersData.push(followUp);
            } else if (followUp.isActive === false && followUp.isDelete === false) {
                adminData.push(followUp);
            }
        });
        if (adminData.length === 0) {
            // No followUp exist for admin
            return { status: false, subCode: 400, message: "No followUp found for admin.", data: [] };
        }
        // if (usersData.length === 0) {
        //     // No followUp exist for user
        //     return { : false, subCode: 400, message: "No followUp found for user.", data: [] };
        // }
        adminData.reverse();
        usersData.reverse()
        return {
            status: true,
            subCode: 200,
            message: "followUp retrieved successfully.",
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
