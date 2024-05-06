const { hairingPartnerModel } = require('../models/hairingPartenerlogo.model')

exports.paginationHairingPartner = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await hairingPartnerModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await hairingPartnerModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.addHairingPartner = async (bodyData, email) => {
    try {
        const hairingPartner = await hairingPartnerModel.findOne({ name: bodyData.name })
        // console.log(hairingPartner);
        if (!hairingPartner) {
            // const {} =  bodyData;
            const saveData = new hairingPartnerModel(bodyData)
            saveData.email = email
            await saveData.save()
            return { status: true, subcode: 200, message: "hairingPartner added successfully ", data: saveData }
        } else {
            return { status: false, subcode: 400, message: "hairingPartner already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.removeHairingPartner = async (id) => {
    try {
        const data = await hairingPartnerModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "hairingPartner Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.searchHairingPartner = async (bodyData) => {
    try {

        const data = await hairingPartnerModel.find({ name: { $regex: bodyData.name, $options: 'i' } });

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
};


exports.editHairingPartner = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await hairingPartnerModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "hairingPartner not found.", data: null };
        }
        return { status: true, subcode: 200, message: "hairingPartner updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}
exports.getOneHairingPartner = async (id) => {
    try {
        const data = await hairingPartnerModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subcode: 200, message: "hairingPartner get successfully ", data: data }
        } else {
            return { status: false, subcode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}



exports.getAllHairingPartner = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const hairingPartner = await hairingPartnerModel.find();

        // Filter the hairingPartner based on isActive and isDelete conditions
        const adminhairingPartner = [];
        const userhairingPartner = [];
        hairingPartner.forEach(hairingPartner => {
            if (hairingPartner.isActive === true && hairingPartner.isDelete === false) {
                adminhairingPartner.push(hairingPartner);
                userhairingPartner.push(hairingPartner);
            } else if (hairingPartner.isActive === false && hairingPartner.isDelete === false) {
                adminhairingPartner.push(hairingPartner);
            }
        });

        if (adminhairingPartner.length === 0) {
            // No hairingPartner exist for admin
            return { status: false, subcode: 400, message: "No hairingPartner found for admin.", data: [] };
        }

        // if (userhairingPartner.length === 0) {
        //     // No hairingPartner exist for user
        //     return { status: false, subcode: 400, message: "No hairingPartner found for user.", data: [] };
        // }
        adminhairingPartner.reverse();
        userhairingPartner.reverse()
        return {
            status: true,
            subcode: 200,
            message: "hairingPartner retrieved successfully.",
            data: {
                adminhairingPartner,
                userhairingPartner
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
};
