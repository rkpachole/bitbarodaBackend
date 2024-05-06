const { addFollowUp, removeFollowUp, getOneFollowUp, editFollowUp, getAllFollowUp, searchFollowUp, activeFollowUp, paginationFollowUp, getFollowUpByLeadId } = require("../helpers/followUp.helper")

exports.pagination_FollowUp = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const page = req.query.page
        const { status, subCode, message, data } = await paginationFollowUp(page)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}


exports.add_FollowUp = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const email = "superadmin@bitbaroda.com"
        const { status, subCode, message, data } = await addFollowUp(req.body, email)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.remove_FollowUp = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await removeFollowUp(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.search_FollowUp = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.query
        const { status, subCode, message, data } = await searchFollowUp(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.active_FollowUp = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await activeFollowUp(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.edit_FollowUp = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await editFollowUp(req.body, id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.get_FollowUp_ByLeadId = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await getFollowUpByLeadId(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.get_One_FollowUp = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await getOneFollowUp(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.get_All_FollowUp = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)         
        const { status, subCode, message, data } = await getAllFollowUp()
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}


