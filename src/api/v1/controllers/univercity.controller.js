const { addUnivercity, getAllUnivercity, getOneUnivercity, editUnivercity, removeUnivercity, activeUnivercity, searchUnivercity, paginationUnivercity } =require('../helpers/univercity.helper')

exports.pagination_Univercity = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const page = req.query.page
        const { status, subcode, message, data } = await paginationUnivercity(page)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.add_Univercity = async(req,res)=>{
    try {
        // const token = parseJwt(req.headers.authorization) 
        const email = "superadmin@bitbaroda.com"
        const {status,subcode,message,data} = await addUnivercity(req.body,email)
        return status ? res.send({status, message, subcode, data}) : res.send({status, message, subcode})        
    } catch (error) {
        console.log("controller Err:",error);
        return  res.send({ status:false, message: "something went wrong", subcode:400 })    }
}

exports.remove_Univercity = async(req,res)=>{
    try {
        // const token = parseJwt(req.headers.authorization) 
         const id = req.params._id
        const {status,subcode,message,data} = await removeUnivercity(id)
        return status ? res.send({status, message, subcode, data}) : res.send({status, message, subcode})        
    } catch (error) {
        console.log("controller Err:",error);
        return  res.send({ status:false, message: "something went wrong", subcode:400 })    }
}

exports.search_Univercity = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const name = req.query
        const { status, subcode, message, data } = await searchUnivercity(name)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.active_Univercity = async (req, res) => {
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const { status, subcode, message, data } = await activeUnivercity(id)
        return status ? res.send({ status, message, subcode, data }) : res.send({ status, message, subcode })
    } catch (error) {
        console.log("controller Err:", error);
        return res.send({ status: false, message: "something went wrong", subcode: 400 })
    }
}

exports.edit_Univercity = async(req,res)=>{
    try {
        // const token = parseJwt(req.headers.authorization) 
        const id = req.params._id
        const {status,subcode,message,data} = await editUnivercity(req.body,id)
        return status ? res.send({status, message, subcode, data}) : res.send({status, message, subcode})        
    } catch (error) {
        console.log("controller Err:",error);
        return  res.send({ status:false, message: "something went wrong", subcode:400 })    }
}

exports.get_One_Univercity = async(req,res) =>{
    try {
          // const token = parseJwt(req.headers.authorization) 
          const id = req.params._id
          const {status,subcode,message,data} = await getOneUnivercity(id)
          return status ? res.send({status, message, subcode, data}) : res.send({status, message, subcode})
    } catch (error) {
        console.log("controller Err:",error);
        return  res.send({ status:false, message: "something went wrong", subcode:400 })
    }
}

exports.get_All_Univercity = async(req,res) =>{
    try {
          // const token = parseJwt(req.headers.authorization)         
        const { status, subcode, message, data } = await getAllUnivercity()
          return status ? res.send({status, message, subcode, data}) : res.send({status, message, subcode})
    } catch (error) {
        console.log("controller Err:",error);
        return  res.send({ status:false, message: "something went wrong", subcode:400 })
    }
}


