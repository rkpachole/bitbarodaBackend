const { studyMaterialModel } = require("../models/studyMaterial.model")


exports.paginationStudyMaterial = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await studyMaterialModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await studyMaterialModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.addStudyMaterial = async (bodyData, email) => {
    try {
        const studyMaterial = await studyMaterialModel.findOne({ studyMaterialName: bodyData.name })
        // console.log(studyMaterial);
        if (!studyMaterial) {
            const { ...data } = bodyData;
            const saveData = new studyMaterialModel(data)
            saveData.email = email
            await saveData.save()
            return { status: true, subcode: 200, message: "studyMaterial added successfully ", data: saveData }
        } else {
            return { status: false, subcode: 400, message: "studyMaterial already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.removeStudyMaterial = async (id) => {
    try {
        const data = await studyMaterialModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "studyMaterial Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.searchStudyMaterial = async (bodyData) => {
    try {

        const data = await studyMaterialModel.find({ titel: { $regex: bodyData.titel, $options: 'i' } });

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

exports.activeStudyMaterial = async (id) => {
    try {
        const data = await studyMaterialModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subcode: 200, message: "studyMaterial activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "studyMaterial deactivated successfully", data: data };
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


exports.editStudyMaterial = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await studyMaterialModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "studyMaterial not found.", data: null };
        }
        return { status: true, subcode: 200, message: "studyMaterial updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}
exports.getOneStudyMaterial = async (id) => {
    try {
        const data = await studyMaterialModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subcode: 200, message: "studyMaterial get successfully ", data: data }
        } else {
            return { status: false, subcode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}


exports.getAllStudyMaterial = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const studyMaterial = await studyMaterialModel.find();

        // Filter the studyMaterial based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        studyMaterial.forEach(studyMaterial => {
            if (studyMaterial.isActive === true && studyMaterial.isDelete === false) {
                adminData.push(studyMaterial);
                usersData.push(studyMaterial);
            } else if (studyMaterial.isActive === false && studyMaterial.isDelete === false) {
                adminData.push(studyMaterial);
            }
        });

        if (adminData.length === 0) {
            // No studyMaterial exist for admin
            return { status: false, subcode: 400, message: "No studyMaterial found for admin.", data: [] };
        }

        // if (usersData.length === 0) {
        //     // No studyMaterial exist for user
        //     return { status: false, subcode: 400, message: "No studyMaterial found for user.", data: [] };
        // }

        adminData.reverse();
        usersData.reverse()
        return {
            status: true,
            subcode: 200,
            message: "studyMaterial retrieved successfully.",
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
