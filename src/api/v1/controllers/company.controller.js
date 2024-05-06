const { query } = require("express")
const { addCompany, removeCompany, getOneCompany, editCompany, getAllCompany, searchCompany, activeCompany, paginationCompany } = require("../helpers/company.helper")

exports.pagination_Company = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const page = req.query.page
        const { status, subcode, message, data } = await paginationCompany(page)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}


exports.add_Company = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const email = "superadmin@bitbaroda.com"
        const { status, subcode, message, data } = await addCompany(req.body, email)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.remove_Company = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await removeCompany(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.search_Company = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const names = req.query
        const { status, subcode, message, data } = await searchCompany(names)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.active_Company = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await activeCompany(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.edit_Company = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await editCompany(req.body, id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.get_One_Company = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await getOneCompany(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.get_All_Company = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)         
        const { status, subcode, message, data } = await getAllCompany()
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}


