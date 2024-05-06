const { coursePage1Model } = require('../models/coursePage1.model')

exports.paginationCoursePage1 = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await coursePage1Model.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await coursePage1Model.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subCode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}

exports.addCoursePage1 = async (bodyData, email) => {
    try {
        const { ...data } = bodyData
        const saveData = new coursePage1Model(data)
        saveData.email = email
        await saveData.save()
        // console.log(saveData);
        return { status: true, subCode: 200, message: "CoursePage1 added successfully ", data: saveData }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
}

exports.removeCoursePage1 = async (id) => {
    try {
        const data = await coursePage1Model.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subCode: 200, message: "CoursePage1 Deleted successfully ", data: data }
        else
            return { status: false, subCode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

// exports.unActiveCourse = async (id) => {
//     try {
//         const data = await coursePage1Model.findOneAndUpdate(
//             { _id: id },
//             { isActive: false },
//             { new: true }
//         );
//         return { status: true, subCode: 200, message: "Course UNACTIVATED successfully ", data: data }
//     } catch (error) {
//         console.log("Helper Err:", error);
//         return { status: false, subCode: 400, message: error.message }
//     }
// }

exports.activeCoursePage1 = async (id) => {
    try {
        const data = await coursePage1Model.findOne({ _id: id, isDelete: false });
        if (data) {
            data.isActive = !data.isActive; // Toggle isActive value
            await data.save();
            if (data.isActive) {
                return { status: true, subCode: 200, message: "CoursePage1 activated successfully", data: data };
            } else {
                return { status: true, subCode: 200, message: "CoursePage1 deactivated successfully", data: data };
            }
        }
        return {
            status: false, subCode: 400, message: "data not found", data: data
        }

    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.editCoursePage1 = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData;
        const data = await coursePage1Model.findOneAndUpdate(
            { courseId: id },
            newData,
            { new: true }
        );
        // console.log(data);
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subCode: 404, message: "CoursePage1 not found.", data: null };
        }
        return { status: true, subCode: 200, message: "CoursePage1 updated successfully.", data: data };
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }
};

exports.getOneCoursePage1 = async (id) => {
    try {
        const data = await coursePage1Model.findOne({ _id: id })
        if (data.isActive === true) { return { status: true, subCode: 200, message: "CoursePage1 get successfully ", data: data } }
        else { return { status: false, subCode: 400, message: "data not exist" } }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message }
    }
}

exports.getAllCoursePage1 = async () => {

    try {
        const CoursePage1 = await coursePage1Model.find();

        // Filter the CoursePage1 based on isActive and isDelete conditions
        const adminCoursePage1 = [];
        const userCoursePage1 = [];
        CoursePage1.forEach(course => {
            if (course.isActive === true && course.isDelete === false) {
                adminCoursePage1.push(course);
                userCoursePage1.push(course);
            } else if (course.isActive === false && course.isDelete === false) {
                adminCoursePage1.push(course);
            }
        });

        if (adminCoursePage1.length === 0) {
            // No CoursePage1 exist for admin
            return { status: false, subCode: 400, message: "No CoursePage1 found for admin.", data: [] };
        }

        // if (userCoursePage1.length === 0) {
        //     // No CoursePage1 exist for user
        //     return { status: false, subCode: 400, message: "No CoursePage1 found for user.", data: [] };
        // }
        adminCoursePage1.reverse()
        userCoursePage1.reverse()
        return {
            status: true,
            subCode: 200,
            message: "CoursePage1 retrieved successfully.",
            data: {
                adminCoursePage1,
                userCoursePage1
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subCode: 400, message: error.message };
    }

}

exports.searchCourse = async (bodyData) => {
    try {

        // Use Mongoose to find CoursePage1 that match the search term in their courseName field
        const data = await coursePage1Model.find({ courseName: { $regex: bodyData.courseName, $options: 'i' } });

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


