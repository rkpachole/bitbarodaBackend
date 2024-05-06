const { learningPartnerModel } = require('../models/learningPartenerlogo.model')


exports.paginationLearningPartner = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await learningPartnerModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await learningPartnerModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.addLearningPartner = async (bodyData, email) => {
    try {
        const learningPartner = await learningPartnerModel.findOne({ name: bodyData.name })
        // console.log(learningPartner);
        if (!learningPartner) {
            // const {} =  bodyData;
            const saveData = new learningPartnerModel(bodyData)
            saveData.email = email
            await saveData.save()
            return { status: true, subcode: 200, message: "learningPartner added successfully ", data: saveData }
        } else {
            return { status: false, subcode: 400, message: "learningPartner already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.removeLearningPartner = async (id) => {
    try {
        const data = await learningPartnerModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "learningPartner Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.searchlearningPartner = async (bodyData) => {
    try {

        const data = await learningPartnerModel.find({ name: { $regex: bodyData.name, $options: 'i' } });

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

exports.activeHairingPartner = async (id) => {
    try {
        const data = await hairingPartnerModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subcode: 200, message: "hairingPartner activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "hairingPartner deactivated successfully", data: data };
            }
        }
        return {
            status: false, subcode: 400, message: "data not found", data: data
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.activeLearningPartner = async (id) => {
    try {
        const data = await learningPartnerModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subcode: 200, message: "learningPartner activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "learningPartner deactivated successfully", data: data };
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


exports.editLearningPartner = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await learningPartnerModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "learningPartner not found.", data: null };
        }
        return { status: true, subcode: 200, message: "learningPartner updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}
exports.getOneLearningPartner = async (id) => {
    try {
        const data = await learningPartnerModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subcode: 200, message: "learningPartner get successfully ", data: data }
        } else {
            return { status: false, subcode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}



exports.getAllLearningPartner = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const learningPartner = await learningPartnerModel.find();

        // Filter the learningPartner based on isActive and isDelete conditions
        const adminlearningPartner = [];
        const userlearningPartner = [];
        learningPartner.forEach(learningPartner => {
            if (learningPartner.isActive === true && learningPartner.isDelete === false) {
                adminlearningPartner.push(learningPartner);
                userlearningPartner.push(learningPartner);
            } else if (learningPartner.isActive === false && learningPartner.isDelete === false) {
                adminlearningPartner.push(learningPartner);
            }
        });

        if (adminlearningPartner.length === 0) {
            // No learningPartner exist for admin
            return { status: false, subcode: 400, message: "No learningPartner found for admin.", data: [] };
        }

        // if (userlearningPartner.length === 0) {
        //     // No learningPartner exist for user
        //     return { status: false, subcode: 400, message: "No learningPartner found for user.", data: [] };
        // }
        adminlearningPartner.reverse();
        userlearningPartner.reverse()
        return {
            status: true,
            subcode: 200,
            message: "learningPartner retrieved successfully.",
            data: {
                adminlearningPartner,
                userlearningPartner
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
};
