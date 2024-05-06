const { roleModel } = require("../models/role.model")

exports.paginationRole = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await roleModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await roleModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.addRole = async (bodyData, email) => {
    try {
        const roledata = await roleModel.findOne({ roleName:bodyData.roleName });
        // console.log(role);        
        if (!roledata) {
            const saveData = new roleModel(bodyData)
            saveData.email = email
            await saveData.save()
            return { status: true, subcode: 200, message: "role added successfully ", data: saveData }
        } else {
            return { status: false, subcode: 400, message: "role already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.removeRole = async (id) => {
    try {
        const data = await roleModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "role Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}


exports.searchRole = async (bodyData) => {
    try {

        const data = await roleModel.find({ roleName: { $regex: bodyData.roleName, $options: 'i' } });

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

exports.activeRole = async (id) => {
    try {
        const data = await roleModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subcode: 200, message: "role activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "role deactivated successfully", data: data };
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


exports.editRole = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await roleModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "role not found.", data: null };
        }
        return { status: true, subcode: 200, message: "role updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}
exports.getOneRole = async (id) => {
    try {
        const data = await roleModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subcode: 200, message: "role get successfully ", data: data }
        } else {
            return { status: false, subcode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}



exports.getAllRole = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const role = await roleModel.find();

        // Filter the role based on isActive and isDelete conditions
        const adminrole = [];
        const userrole = [];
        role.forEach(role => {
            if (role.isActive === true && role.isDelete === false) {
                adminrole.push(role);
                userrole.push(role);
            } else if (role.isActive === false && role.isDelete === false) {
                adminrole.push(role);
            }
        });

        if (adminrole.length === 0) {
            // No role exist for admin
            return { status: false, subcode: 400, message: "No role found for admin.", data: [] };
        }

        // if (userrole.length === 0) {
        //     // No role exist for user
        //     return { status: false, subcode: 400, message: "No role found for user.", data: [] };
        // }
        adminrole.reverse();
        userrole.reverse()
        return {
            status: true,
            subcode: 200,
            message: "role retrieved successfully.",
            data: {
                adminrole,
                userrole
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
};
