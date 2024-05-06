const { sourceModel } = require("../models/source.model")

exports.paginationSource = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await sourceModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await sourceModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subCode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}


exports.addSource = async (bodyData, email) => {
    try {
        const source = await sourceModel.findOne({ sourceName: bodyData.name })
        // console.log(source);
        if (!source) {
            // const {} =  bodyData;
            const saveData = new sourceModel(bodyData)
            saveData.email = email
            await saveData.save()
            return { status: true, subCode: 200, message: "source added successfully ", data: saveData }
        } else {
            return { status: false, subCode: 400, message: "source already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.removeSource = async (id) => {
    try {
        const data = await sourceModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subCode: 200, message: "source Deleted successfully ", data: data }
        else
            return { status: false, subCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}


exports.searchSource = async (bodyData) => {
    try {

        const data = await sourceModel.find({ sourceName: { $regex: bodyData.sourceName, $options: 'i' } });

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

exports.activeSource = async (id) => {
    try {
        const data = await sourceModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subCode: 200, message: "source activated successfully", data: data };
            } else {
                return { status: true, subCode: 200, message: "source deactivated successfully", data: data };
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


exports.editSource = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await sourceModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subCode: 404, message: "source not found.", data: null };
        }
        return { status: true, subCode: 200, message: "source updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}
exports.getOneSource = async (id) => {
    try {
        const data = await sourceModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subCode: 200, message: "source get successfully ", data: data }
        } else {
            return { status: false, subCode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}



exports.getAllSource = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const source = await sourceModel.find();
        
        // Filter the source based on isActive and isDelete conditions
        const adminsource = [];
        const usersource = [];
        source.forEach(source => {
            if (source.isActive === true && source.isDelete === false) {
                adminsource.push(source);
                usersource.push(source);
            } else if (source.isActive === false && source.isDelete === false) {
                adminsource.push(source);
            }
        });
        // console.log(adminsource)

        if (adminsource.length === 0) {
            // No source exist for admin
            return { status: false, subCode: 400, message: "No source found for admin.", data: [] };
        }
        
        // if (usersource.length === 0) {
        //     // No source exist for user
        //     return { status: false, subCode: 400, message: "No source found for user.", data: [] };
        // }
        adminsource.reverse();
        usersource.reverse()
        return {
            status: true,
            subCode: 200,
            message: "source retrieved successfully.",
            data: {
                adminsource,
                usersource
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
};
