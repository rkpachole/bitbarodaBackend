const { addCourse, removeCourse, searchCourseIndividual, activeCourse, editCourse, getOneCourse, getAllCourse, addCoursefile, searchCourse, getAllBackendCourse, getAllFrontendCourse, paginationCourse, getAllIndividualCourse } = require('../helpers/course.helper')

exports.add_Course = async (req, res) => {
    // console.log("req =>", req.files[0].filename);
   
     try {
        //   const token = parseJwt(req.headers.authorization) 
         const email = "superadmin@bitbaroda.com"
         const { status, subcode, message, data } = await addCourse(req.body,email)
         return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
     } catch (error) {
         console.log("controller Err:", error);
         return res.send({ status: false, message: "something went wrong", subcode: 400 })
     }
}

exports.add_Course_file = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const email = "superadmin@bitbaroda.com"
        console.log(req.files)
        const file = req.files;
        // console.log(file);
        const file_name = file.file[0].filename;
        const { status, subcode, message, data } = await addCoursefile(file_name)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.remove_Course = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await removeCourse(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.search_Course = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const name = req.query
        const { status, subcode, message, data } = await searchCourse(name)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.search_Course_Individual = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const name = req.query
        const { status, subcode, message, data } = await searchCourseIndividual(name)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.active_Course = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await activeCourse(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.edit_Course = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await editCourse(req.body, id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.get_One_Course = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await getOneCourse(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.get_All_Course = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)         
        const { status, subcode, message, data } = await getAllCourse()
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.get_All_BackendCourse = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)         
        const { status, subcode, message, data } = await getAllBackendCourse()
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.get_All_Individual_Course = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)         
        const { status, subcode, message, data } = await getAllIndividualCourse()
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}


exports.get_All_FrontendCourse = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)         
        const { status, subcode, message, data } = await getAllFrontendCourse()
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.pagination_Course = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const page = req.query.page
        const { status, subcode, message, data } = await paginationCourse(page)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}
