const {examModel} = require("../models/exam.model")

exports.paginationExam = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await examModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await examModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.addExam = async (bodyData, email) => {
    try {
        const exam = await examModel.findOne({ examName: bodyData.name })
        // console.log(exam);
        if (!exam) {
            // const {} =  bodyData;
            const saveData = new examModel(bodyData)
            saveData.email = email
            await saveData.save()
            return { status: true, subcode: 200, message: "exam added successfully ", data: saveData }
        } else {
            return { status: false, subcode: 400, message: "exam already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.removeExam = async (id) => {
    try {
        const data = await examModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "exam Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}


exports.searchExam = async (bodyData) => {
    try {

        const data = await examModel.find({ examName: { $regex: bodyData.examName, $options: 'i' } });

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

exports.activeExam = async (id) => {
    try {
        const data = await examModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subcode: 200, message: "exam activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "exam deactivated successfully", data: data };
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


exports.editExam = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await examModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "exam not found.", data: null };
        }
        return { status: true, subcode: 200, message: "exam updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}
exports.getOneExam = async (id) => {
    try {
        const data = await examModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subcode: 200, message: "exam get successfully ", data: data }
        } else {
            return { status: false, subcode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}



exports.getAllExam = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const exam = await examModel.find();

        // Filter the exam based on isActive and isDelete conditions
        const adminexam = [];
        const userexam = [];
        exam.forEach(exam => {
            if (exam.isActive === true && exam.isDelete === false) {
                adminexam.push(exam);
                userexam.push(exam);
            } else if (exam.isActive === false && exam.isDelete === false) {
                adminexam.push(exam);
            }
        });

        if (adminexam.length === 0) {
            // No exam exist for admin
            return { status: false, subcode: 400, message: "No exam found for admin.", data: [] };
        }

        // if (userexam.length === 0) {
        //     // No exam exist for user
        //     return { status: false, subcode: 400, message: "No exam found for user.", data: [] };
        // }
        
        adminexam.reverse();
        userexam.reverse()
        return {
            status: true,
            subcode: 200,
            message: "exam retrieved successfully.",
            data: {
                adminexam,
                userexam
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
};
