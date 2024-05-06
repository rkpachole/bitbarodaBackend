const { branchModel } = require("../models/branch.model")

exports.paginationBranch = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await branchModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await branchModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subCode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}


exports.addBranch = async (bodyData, email) => {
    try {
        const branch = await branchModel.findOne({ branchName: bodyData.branchName })
        // console.log(branch);
        if (!branch) {
            // const {} =  bodyData;
            const saveData = new branchModel(bodyData)
            saveData.email = email
            await saveData.save()
            return { status: true, subCode: 200, message: "branch added successfully ", data: saveData }
        } else {
            return { status: false, subCode: 400, message: "branch already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.removeBranch = async (id) => {
    try {
        const data = await branchModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subCode: 200, message: "branch Deleted successfully ", data: data }
        else
            return { status: false, subCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}


exports.searchBranch = async (bodyData) => {
    try {

        const data = await branchModel.find({ branchName: { $regex: bodyData.branchName, $options: 'i' } });

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

exports.activeBranch = async (id) => {
    try {
        const data = await branchModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subCode: 200, message: "branch activated successfully", data: data };
            } else {
                return { status: true, subCode: 200, message: "branch deactivated successfully", data: data };
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


exports.editBranch = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await branchModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subCode: 404, message: "branch not found.", data: null };
        }
        return { status: true, subCode: 200, message: "branch updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}
exports.getOneBranch = async (id) => {
    try {
        const data = await branchModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subCode: 200, message: "branch get successfully ", data: data }
        } else {
            return { status: false, subCode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}



exports.getAllBranch = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const branch = await branchModel.find();
        console.log(branch);

        // Filter the branch based on isActive and isDelete conditions
        const adminbranch = [];
        const userbranch = [];
        branch.forEach(branch => {
            if (branch.isActive === true && branch.isDelete === false) {
                adminbranch.push(branch);
                userbranch.push(branch);
            } else if (branch.isActive === false && branch.isDelete === false) {
                adminbranch.push(branch);
            }
        });

        if (adminbranch.length === 0) {
            // No branch exist for admin
            return { status: false, subCode: 400, message: "No branch found for admin.", data: [] };
        }

        // if (userbranch.length === 0) {
        //     // No branch exist for user
        //     return { status: false, subCode: 400, message: "No branch found for user.", data: [] };
        // }
        adminbranch.reverse();
        userbranch.reverse()
        return {
            status: true,
            subCode: 200,
            message: "branch retrieved successfully.",
            data: {
                adminbranch,
                userbranch
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
};
