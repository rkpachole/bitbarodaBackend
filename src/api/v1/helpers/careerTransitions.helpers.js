const { careerTransitionsModel } = require('../models/careerTransitions.model')


exports.paginationCareerTransitions = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await careerTransitionsModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await careerTransitionsModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subCode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}

exports.addCareerTransitions = async (bodyData, email) => {
    try {
        const careerTransitions = await careerTransitionsModel.findOne({ name: bodyData.Name })
        // console.log(careerTransitions);
        if (!careerTransitions) {
            // const {} =  bodyData;
            const saveData = new careerTransitionsModel(bodyData)
            saveData.email = email
            await saveData.save()
            return { status: true, subCode: 200, message: "careerTransitions added successfully ", data: saveData }
        } else {
            return { status: false, subCode: 400, message: "careerTransitions already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.removeCareerTransitions = async (id) => {
    try {
        const data = await careerTransitionsModel.findOneAndUpdate(
            { _id: id , isDelete:false},
            { isActive: false, isDelete: true },
            { new: true }
        );
      if(data)
          return { status: true, subCode: 200, message: "careerTransitions Deleted successfully ", data: data }
        else
          return { status: false, subCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.unActivecareerTransitions = async (id) => {
    try {
        const data = await careerTransitionsModel.findOneAndUpdate(
            { _id: id },
            { isActive: false },
            { new: true }
        );
        return { status: true, subCode: 200, message: "careerTransitions UNACTIVATED successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.activeCareerTransitions = async (id) => {
    try {
        const data = await careerTransitionsModel.findOne({ _id: id, isDelete: false });
        if (data) {
            
            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subCode: 200, message: "careerTransitions activated successfully", data: data };
            } else {
                return { status: true, subCode: 200, message: "careerTransitions deactivated successfully", data: data };
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


exports.editCareerTransitions = async (bodyData, id) => {
    try {
        const {...newData} = bodyData
        const data = await careerTransitionsModel.findOneAndUpdate(
            { _id: id },
            newData
,            { new: true }
        );
        if (data.isDelete === true) {
            // CareerTransitions with the given id not found
            return { status: false, subCode: 404, message: "careerTransitions not found.", data: null };
        }
        return { status: true, subCode: 200, message: "careerTransitions updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.getOneCareerTransitions = async (id) => {
    try {
        const data = await careerTransitionsModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subCode: 200, message: "careerTransitions get successfully ", data: data }
        } else {
            return { status: false, subCode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

// exports.getCoursePage1Content = async (id) => {
//     try {
//         const data = await careerTransitionsModel.find({ courseId: id })
//         if (data.isActive === true) { return { status: true, subCode: 200, message: "content get successfully ", data: data } }
//         else { return { status: false, subCode: 400, message: "data not exist" } }
//     } catch (error) {
//         console.log("Helper Err:", error);
//         return { status: false, subCode: 400, message: error.message }
//     }
// }

exports.getCoursePage1Content = async (id) => {
    try {
        const query = {
            'course.courseId': id
        };
        const data = await careerTransitionsModel.find(query);
        console.log(data);
        if (data) {
            return { status: true, subCode: 200, message: "content get successfully ", data: data }
        } else {
            return { status: false, subCode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return {
            status: false,
            subCode: 400,
            message: error.message
        };
    }
};

exports.getAllCareerTransitions = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const careerTransitions = await careerTransitionsModel.find();

        // Filter the careerTransitions based on isActive and isDelete conditions
        const admincareerTransitions = [];
        const usercareerTransitions = [];
        careerTransitions.forEach(careerTransitions => {
            if (careerTransitions.isActive === true && careerTransitions.isDelete === false) {
                admincareerTransitions.push(careerTransitions);
                usercareerTransitions.push(careerTransitions);
            } else if (careerTransitions.isActive === false && careerTransitions.isDelete === false) {
                admincareerTransitions.push(careerTransitions);
            }
        });
        if (admincareerTransitions.length === 0) {
            // No careerTransitions exist for admin
            return { status: false, subCode: 400, message: "No careerTransitions found for admin.", data: [] };
        }

        // if (usercareerTransitions.length === 0) {
        //     // No careerTransitions exist for user
        //     return { status: false, subCode: 400, message: "No careerTransitions found for user.", data: [] };
        // }
        admincareerTransitions.reverse();
        usercareerTransitions.reverse()
        return {
            status: true,
            subCode: 200,
            message: "careerTransitions retrieved successfully.",
            data: {
                admincareerTransitions,
                usercareerTransitions
            }
        }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
};

exports.searchCareerTransitions = async (bodyData) => {
    try {

        // Use Mongoose to find CareerTransitionss that match the search term in their CareerTransitionsName field
        const data = await careerTransitionsModel.find({ Name: { $regex: bodyData.Name, $options: 'i' } });

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
};
