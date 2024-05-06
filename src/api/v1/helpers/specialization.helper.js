const { specializationModel } = require("../models/specialization.model")

exports.paginationSpecialization = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await specializationModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await specializationModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subCode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}

exports.addSpecialization = async (bodyData, email) => {
    try {
        const specialization = await specializationModel.findOne({ specializationName: bodyData.name })
        // console.log(specialization);
        if (!specialization) {
            const { ...data } = bodyData;
            const saveData = new specializationModel(data)
            saveData.email = email
            await saveData.save()
            return { status: true, subCode: 200, message: "specialization added successfully ", data: saveData }
        } else {
            return { status: false, subCode: 400, message: "specialization already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.removeSpecialization = async (id) => {
    try {
        const data = await specializationModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subCode: 200, message: "specialization Deleted successfully ", data: data }
        else
            return { status: false, subCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}


exports.searchSpecialization = async (bodyData) => {
    try {
        const data = await specializationModel.find({ specializationName: { $regex: bodyData.specializationName, $options: 'i' } });
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

exports.activeSpecialization = async (id) => {
    try {
        const data = await specializationModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subCode: 200, message: "specialization activated successfully", data: data };
            } else {
                return { status: true, subCode: 200, message: "specialization deactivated successfully", data: data };
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


exports.editSpecialization = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await specializationModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subCode: 404, message: "specialization not found.", data: null };
        }
        return { status: true, subCode: 200, message: "specialization updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}


exports.getOneSpecialization = async (id) => {
    try {
        const data = await specializationModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subCode: 200, message: "specialization get successfully ", data: data }
        } else {
            return { status: false, subCode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}


exports.getAllSpecialization = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const specialization = await specializationModel.find();

        // Filter the specialization based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        specialization.forEach(specialization => {
            if (specialization.isActive === true && specialization.isDelete === false) {
                adminData.push(specialization);
                usersData.push(specialization);
            } else if (specialization.isActive === false && specialization.isDelete === false) {
                adminData.push(specialization);
            }
        });

        if (adminData.length === 0) {
            // No specialization exist for admin
            return { status: false, subCode: 400, message: "No specialization found for admin.", data: [] };
        }

        // if (usersData.length === 0) {
        //     // No specialization exist for user
        //     return { status: false, subCode: 400, message: "No specialization found for user.", data: [] };
        // }

        adminData.reverse();
        usersData.reverse()
        return {
            status: true,
            subCode: 200,
            message: "specialization retrieved successfully.",
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
