const { addSubCategory, removeSubCategory, editSubCategory, getOneSubCategory, getAllSubCategory, activeSubCategory, searchSubCategory, paginationSubCategory } = require('../helpers/subCategory.helper') 

exports.pagination_SubCategory = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const page = req.query.page
        const { status, subcode, message, data } = await paginationSubCategory(page)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.add_SubCategory = async(req,res)=>{
    try {
        // const token = parseJwt(req.headers.authorization) 
        const email = "superadmin@bitbaroda.com"
        const {status,subcode,message,data} = await addSubCategory(req.body,email)
        return status ? res.send({status, message, subcode, data}) : res.send({status, message, subcode})        
    } catch (error) {
        console.log("controller Err:",error);
        return  res.send({ status:false, message: "something went wrong", subcode:400 })    }
}

exports.remove_SubCategory = async(req,res)=>{
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const {status, subcode, message, data} = await removeSubCategory(id)
        return status ? res.send({status, message, subcode, data}) : res.send({status, message,subcode})        
    } catch (error) {
        console.log("controller Err:",error);
        return  res.send({ status:false, message: "something went wrong", subcode:400 })    }
}

exports.edit_SubCategory = async(req,res)=>{
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const {status,subcode,message,data} = await editSubCategory(req.body,id)
        return status ? res.send({status, message, subcode, data}) : res.send({status, message, subcode})        
    } catch (error) {
        console.log("controller Err:",error);
        return  res.send({ status:false, message: "something went wrong", subcode:400 })    }
}

exports.get_One_SubCategory = async(req,res) =>{
    try {
          // const token = parseJwt(req.headers.authorization) 
          const id = req.params._id
          const {status,subcode,message,data} = await getOneSubCategory(id)
          return status ? res.send({status, message, subcode, data}) : res.send({status, message, subcode})
    } catch (error) {
        console.log("controller Err:",error);
        return  res.send({ status:false, message: "something went wrong", subcode:400 })
    }
}

exports.get_All_SubCategory = async(req,res) =>{
    try {
          // const token = parseJwt(req.headers.authorization) 
          const id = req.params._id
          const {status,subcode,message,data} = await getAllSubCategory()
          return status ? res.send({status, message, subcode, data}) : res.send({status, message, subcode})
    } catch (error) {
        console.log("controller Err:",error);
        return  res.send({ status:false, message: "something went wrong", subcode:400 })
    }
}


exports.search_SubCategory = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const name = req.query
        const { status, subcode, message, data } = await searchSubCategory(name)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.active_SubCategory = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await activeSubCategory(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}