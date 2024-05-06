const { addCategory, removeCategory, getOneCategory, editCategory, getAllCategory, searchCategory, activeCategory, paginationCategory } = require("../helpers/category.helper")

exports.pagination_Category = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const page = req.query.page
        const { status, subCode, message, data } = await paginationCategory(page)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.add_Category = async(req,res)=>{
    try {
        // const token = parseJwt(req.headers.authorization) 
        const email = "superadmin@bitbaroda.com"
        const { status, subCode, message, data } = await addCategory(req.body, email)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })        
    } catch (error) {
        console.log("controller Err:",error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.remove_Category = async(req,res)=>{
    try {
        // const token = parseJwt(req.headers.authorization) 
         const id = req.params._id
        const { status, subCode, message, data } = await removeCategory(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })        
    } catch (error) {
        console.log("controller Err:",error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
} 

exports.search_Category =  async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const name = req.query
        const { status, subCode, message, data } = await searchCategory(name)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
} 
 
exports.active_Category =  async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await activeCategory(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
} 

exports.edit_Category = async(req,res)=>{
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subCode, message, data } = await editCategory(req.body, id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })        
    } catch (error) {
        console.log("controller Err:",error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.get_One_Category = async (req, res) => {
    try {
          // const token = parseJwt(req.headers.authorization) 
          const id = req.params._id
        const { status, subCode, message, data } = await getOneCategory(id)
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:",error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}

exports.get_All_Category = async (req, res) => {
    try {
          // const token = parseJwt(req.headers.authorization)         
        const { status, subCode, message, data } = await getAllCategory()
        return status ? res.send({ status, message, subCode, data }) : res.send({ status, message, subCode })
    } catch (error) {
        console.log("controller Err:",error);
        return res.send({ status: false, message: "something went wrong", subCode: 400 })
    }
}


