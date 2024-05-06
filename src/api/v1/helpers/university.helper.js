const { universityModel } = require('../models/university.model')

exports.paginationUniversity = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await universityModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await universityModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, sunCode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, sunCode: 400, message: error.message };
    }
}


exports.addUniversity = async (bodyData, email) => {
    try {
        const data = { email: email, universityName: bodyData.universityName }
        const saveData = new universityModel(data)
        await saveData.save()
        return { status: true, sunCode: 200, message: "university added successfully ", data: saveData }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, sunCode: 400, message: error.message }
    }
}

exports.removeUniversity = async (id) => {
    try {
        const data = await universityModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, sunCode: 200, message: "university Deleted successfully ", data: data }
        else
            return { status: false, sunCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, sunCode: 400, message: error.message }
    }
}
exports.searchUniversity = async (bodyData) => {
    try {

     
        const data = await universityModel.find({ universityName: { $regex: bodyData.universityName, $options: 'i' } });

        if (data || data.length) {
            return {
                status: true,
                sunCode: 200,
                message: "data retrieved successfully.",
                data: data
            };
        }
        return {
            status: false,
            sunCode: 404,
            message: "No data found with the given search term.",
            data: []
        };
    } catch (error) {
        console.error("Helper Err:", error);
        return {
            status: false,
            sunCode: 400,
            message: error.message,
            data: []
        };
    }
};


exports.activeUniversity = async (id) => {
    try {
        const data = await universityModel.findOne({ _id: id, isDelete: false });
        if (data) {
            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, sunCode: 200, message: "university activated successfully", data: data };
            } else {
                return { status: true, sunCode: 200, message: "university deactivated successfully", data: data };
            }
        }
        return {
            status: false, sunCode: 400, message: "data not found", data: data
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, sunCode: 400, message: error.message }
    }
}

exports.editUniversity = async (bodyData, id) => {
    try {
        const name = bodyData.universityName
        const data = await universityModel.findOneAndUpdate(
            { _id: id },
            { universityName: name },
            { new: true, select: '-_id -__v  -isActive' }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, sunCode: 404, message: "university not found.", data: null };
        }

        return { status: true, sunCode: 200, message: "university updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, sunCode: 400, message: error.message }
    }
}
exports.getOneUniversity = async (id) => {
    try {
        const data = await universityModel.findOne({ _id: id })
        if (data.isActive === true) { return { status: true, sunCode: 200, message: "university get successfully ", data: data } }
        else { return { status: false, sunCode: 400, message: "data not exist" } }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, sunCode: 400, message: error.message }
    }
}

exports.getAllUniversity = async () => {
    try {
        const universities = await universityModel.find();

        // Filter the universities based on isActive and isDelete conditions
        const adminData = [];
        const userData = [];
        universities.forEach(university => {
            if (university.isActive === true && university.isDelete === false) {
                adminData.push(university);
                userData.push(university);
            } else if (university.isActive === false && university.isDelete === false) {
                adminData.push(university);
            }
        });

        if (adminData.length === 0) {
            // No universities exist for admin
            return { status: false, sunCode: 400, message: "No universities found for admin.", data: [] };
        }

        // if (userData.length === 0) {
        //     // No universities exist for user
        //     return { status: false, sunCode: 400, message: "No universities found for user.", data: [] };
        // }

        adminData.reverse()
        userData.reverse()
        return {
            status: true,
            sunCode: 200,
            message: "Universities retrieved successfully.",
            data: {
                adminData,
                userData
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, sunCode: 400, message: error.message };
    }

}
