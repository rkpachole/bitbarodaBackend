const { addLead, removeLead, searchLead, activeLead, editLead, getOneLead, getAllLead, DuplicateData, searchLeadByMobile, paginationLead, leadValue } = require('../helpers/lead.helper')

exports.add_Lead = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const email = "superadmin@bitbaroda.com"
        const { status, subCode, message, data } = await addLead(req.body, email)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}
exports.Duplicate_Data = async (req, res) => {
    try {
        const { status, subCode, message, data } = await DuplicateData(req.body)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    }
    catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}
exports.remove_Lead = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await removeLead(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.search_Lead_ByMobile = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const mobile = req.query
        const { status, subCode, message, data } = await searchLeadByMobile(mobile)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.search_Lead = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const name = req.query
        const { status, subCode, message, data } = await searchLead(name)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.active_Lead = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await activeLead(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.edit_Lead = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await editLead(req.body, id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.get_One_Lead = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await getOneLead(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.get_All_Lead = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)         
        const { status, subCode, message, data } = await getAllLead()
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}
exports.pagination_Lead = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const page = req.query.page
        const { status, subCode, message, data } = await paginationLead(page)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}
exports.lead_Value = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)         
        const { status, subCode, message, data } = await leadValue(req.body.courseIds)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}


