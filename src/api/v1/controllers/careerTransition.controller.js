const { addCareerTransitions, removeCareerTransitions, getOneCareerTransitions, editCareerTransitions, getAllCareerTransitions, activeCareerTransitions, searchCareerTransitions, paginationCareerTransitions, getCoursePage1Content } = require("../helpers/careerTransitions.helpers")

exports.pagination_CareerTransitions = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const page = req.query.page
        const { status, subCode, message, data } = await paginationCareerTransitions(page)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.add_CareerTransitions = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const email = "superadmin@bitbaroda.com"
        const { status, subCode, message, data } = await addCareerTransitions(req.body, email)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.remove_CareerTransitions = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await removeCareerTransitions(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.search_CareerTransitions = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const name = req.query
        const { status, subCode, message, data } = await searchCareerTransitions(name)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}
exports.active_CareerTransitions = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await activeCareerTransitions(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.edit_CareerTransitions = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await editCareerTransitions(req.body, id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.get_One_careerTransitions = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await getOneCareerTransitions(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.get_All_careerTransitions = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)         
        const { status, subCode, message, data } = await getAllCareerTransitions()
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.get_CoursePage1_Content = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)  
        const id = req.params._id
        const { status, subCode, message, data } = await getCoursePage1Content(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}
