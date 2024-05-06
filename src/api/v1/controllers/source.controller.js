const { addSource, removeSource, getOneSource, editSource, getAllSource, searchSource, activeSource, paginationSource } = require("../helpers/source.helper.js")


exports.pagination_Source = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const page = req.query.page
        const { status, subcode, message, data } = await paginationSource(page)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.add_Source = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const email = "superadmin@bitbaroda.com"
        const { status, subcode, message, data } = await addSource(req.body, email)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.remove_Source = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await removeSource(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.search_Source = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.query
        const { status, subcode, message, data } = await searchSource(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.active_Source = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await activeSource(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.edit_Source = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await editSource(req.body, id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.get_One_Source = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await getOneSource(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.get_All_Source = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization)         
        const { status, subcode, message, data } = await getAllSource()
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}


