
const { courseModel } = require("../models/course.model")
const { subCourseModel } = require("../models/subcourse.model")
const { specializationModel } = require("../models/specialization.model")

exports.addCourse = async (bodyData, email) => {
    try {
        const exist = await courseModel.findOne({ courseName: bodyData.courseName })

        if (exist) {
            return { status: false, subcode: 400, message: "already exist ", data: {} }
        }
        else {
            const { ...data } = bodyData
            const saveData = new courseModel(data)
            saveData.email = email
            await saveData.save()
            if (saveData.courseType === "bygroup") {
                const { ...subcourseData } = new subCourseModel(saveData.Subcourse)
                subcourseData.email = email
                subcourseData.courseGroupName = saveData.courseName
                subcourseData.courseGroupId = saveData._id
                subcourseData.save(),
                    console.log("sucourse", subcourseData);
                const { ...specializationData } = new specializationModel(saveData.specialization)
                specializationData.courseGroupName = saveData.courseName
                specializationData.email = email
                specializationData.courseGroupId = saveData._id
                specializationData.save()
                console.log("specializationData", specializationData);
            }
            return { status: true, subcode: 200, message: "Course added successfully ", data: saveData }
        }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.addCoursefile = async (bodyData) => {
    try {
        const file_name = bodyData;
        // const file_name = file.file[0].filename;
        return { status: true, subcode: 200, message: "file uploaded successfully ", data: { file_name, } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.removeCourse = async (id) => {
    try {
        const data = await courseModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "Course Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

// exports.unActiveCourse = async (id) => {
//     try {
//         const data = await courseModel.findOneAndUpdate(
//             { _id: id },
//             { isActive: false },
//             { new: true }
//         );
//         return { status: true, subcode: 200, message: "Course UNACTIVATED successfully ", data: data }
//     } catch (error) {
//         console.log("Helper Err:", error);
//         return { status: false, subcode: 400, message: error.message }
//     }
// }

exports.activeCourse = async (id) => {
    try {
        const data = await courseModel.findOne({ _id: id, isDelete: false });
        if (data) {
            data.isActive = !data.isActive;
            await data.save();
            if (data.isActive) {
                return { status: true, subcode: 200, message: "course activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "course deactivated successfully", data: data };
            }
        }
        return {
            status: false, subcode: 400, message: "data not found", data: data
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.editCourse = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData;
        const data = await courseModel.findByIdAndUpdate(
            { _id: id },
            newData,
            { new: true }
        );
        // console.log(data);
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "Course not found.", data: null };
        }
        return { status: true, subcode: 200, message: "Course updated successfully.", data: data };
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
};

exports.getOneCourse = async (id) => {
    try {
        const data = await courseModel.findOne({ _id: id })
        if (data.isActive === true) { return { status: true, subcode: 200, message: "Course get successfully ", data: data } }
        else { return { status: false, subcode: 400, message: "data not exist" } }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.getAllCourse = async () => {
    try {
        const courses = await courseModel.find();

        // Filter the courses based on isActive and isDelete conditions
        const adminCourses = [];
        const userCourses = [];
        courses.forEach(course => {
            if (course.isActive === true && course.isDelete === false) {
                adminCourses.push(course);
                userCourses.push(course);
            } else if (course.isActive === false && course.isDelete === false) {
                adminCourses.push(course);
            }
        });
        if (adminCourses.length === 0) {
            // No courses exist for admin
            return { status: false, subcode: 400, message: "No courses found for admin.", data: [] };
        }
        // if (userCourses.length === 0) {
        //     // No courses exist for user
        //     return { status: false, subcode: 400, message: "No courses found for user.", data: [] };
        // }
        adminCourses.reverse()
        userCourses.reverse()
        return {
            status: true,
            subcode: 200,
            message: "Courses retrieved successfully.",
            data: {
                adminCourses,
                userCourses
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }

}

exports.getAllBackendCourse = async () => {
    try {
        const courses = await courseModel.find();

        // Filter the courses based on isActive and isDelete conditions
        const adminCourses = [];
        const userCourses = [];
        courses.forEach(course => {
            if (course.isActive === true && course.isDelete === false && course.backendVisible === true) {
                adminCourses.push(course);
                userCourses.push(course);
            } else if (course.isActive === false && course.isDelete === false && course.backendVisible === true) {
                adminCourses.push(course);
            }
        });
        if (adminCourses.length === 0) {
            // No courses exist for admin
            return { status: false, subcode: 400, message: "No courses found for admin.", data: [] };
        }
        // if (userCourses.length === 0) {
        //     // No courses exist for user
        //     return { status: false, subcode: 400, message: "No courses found for user.", data: [] };
        // }
        adminCourses.reverse()
        userCourses.reverse()
        return {
            status: true,
            subcode: 200,
            message: "Courses retrieved successfully.",
            data: {
                adminCourses,
                userCourses
            }
        }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }

}


exports.getAllFrontendCourse = async () => {
    try {
        const courses = await courseModel.find();

        // Filter the courses based on isActive and isDelete conditions
        const adminCourses = [];
        const userCourses = [];
        courses.forEach(course => {
            if (course.isActive === true && course.isDelete === false && course.frontendVisible === true) {
                adminCourses.push(course);
                userCourses.push(course);
            } else if (course.isActive === false && course.isDelete === false && course.frontendVisible === true) {
                adminCourses.push(course);
            }
        });
        if (adminCourses.length === 0) {
            // No courses exist for admin
            return { status: false, subcode: 400, message: "No courses found for admin.", data: [] };
        }
        // if (userCourses.length === 0) {
        //     // No courses exist for user
        //     return { status: false, subcode: 400, message: "No courses found for user.", data: [] };
        // }
        adminCourses.reverse()
        userCourses.reverse()
        return {
            status: true,
            subcode: 200,
            message: "Courses retrieved successfully.",
            data: {
                adminCourses,
                userCourses
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }

}

exports.getAllIndividualCourse = async () => {
    try {
        const courses = await courseModel.find();        
        // Filter the courses based on isActive and isDelete conditions
        const adminCourses = [];
        const userCourses = [];
        courses.forEach(course => {
            if (course.isActive === true && course.isDelete === false && course.courseType === "individual") {
                // console.log(courses);
                adminCourses.push(course);
                userCourses.push(course);
            } else if (course.isActive === false && course.isDelete === false && course.courseType ==="individual") {
                adminCourses.push(course);
            }
        });
        if (adminCourses.length === 0) {
            // No courses exist for admin
            return { status: false, subcode: 400, message: "No courses found for admin.", data: [] };
        }
        // if (userCourses.length === 0) {
        //     // No courses exist for user
        //     return { status: false, subcode: 400, message: "No courses found for user.", data: [] };
        // }
        adminCourses.reverse()
        userCourses.reverse()
        return {
            status: true,
            subcode: 200,
            message: "Courses retrieved successfully.",
            data: {
                adminCourses,
                userCourses
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }

}

exports.searchCourseIndividual = async (bodyData) => {
    try {
        // Use Mongoose to find courses that match the search term in their courseName field
        const data = await courseModel.find({
            courseName: { $regex: bodyData.courseName, $options: 'i' },
            courseType: 'individual'
        });
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
};

exports.searchCourse = async (bodyData) => {
    try {
        // Use Mongoose to find courses that match the search term in their courseName field
        const data = await courseModel.find({
            courseName: { $regex: bodyData.courseName, $options: 'i' },
                    });
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
};

exports.paginationCourse = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await courseModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await courseModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}





