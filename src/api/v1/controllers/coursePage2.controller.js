const { addCoursePage2, removeCoursePage2, getOneCoursePage2, editCoursePage2, getAllCoursePage2, searchCoursePage2, activeCoursePage2, paginationCoursePage2 } = require("../helpers/coursePage2.helper")

exports.pagination_CoursePage2 = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const page = req.query.page
        const { status, subCode, message, data } = await paginationCoursePage2(page)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.add_CoursePage2 = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const email = "superadmin@bitbaroda.com"
        const { status, subCode, message, data } = await addCoursePage2(req.body, email)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.remove_CoursePage2 = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await removeCoursePage2(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.search_CoursePage2 = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.query
        const { status, subCode, message, data } = await searchCoursePage2(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.active_CoursePage2 = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await activeCoursePage2(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.edit_CoursePage2 = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await editCoursePage2(req.body, id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.get_One_CoursePage2 = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await getOneCoursePage2(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.get_All_CoursePage2 = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)         
        const { status, subCode, message, data } = await getAllCoursePage2()
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}


