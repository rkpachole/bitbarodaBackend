const { addExam, removeExam, getOneExam, editExam, getAllExam, searchExam, activeExam, paginationExam } = require("../helpers/exam.helper")

exports.pagination_Exam = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const page = req.query.page
        const { status, subcode, message, data } = await paginationExam(page)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.add_Exam = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const email = "superadmin@bitbaroda.com"
        const { status, subcode, message, data } = await addExam(req.body, email)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.remove_Exam = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await removeExam(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.search_Exam = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.query
        const { status, subcode, message, data } = await searchExam(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.active_Exam = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await activeExam(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.edit_Exam = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await editExam(req.body, id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.get_One_Exam = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await getOneExam(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.get_All_Exam = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)         
        const { status, subcode, message, data } = await getAllExam()
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}


