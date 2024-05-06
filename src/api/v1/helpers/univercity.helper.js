const {univercityModel} = require('../models/univercity.model')

exports.paginationUnivercity = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await univercityModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await univercityModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}


exports.addUnivercity = async (bodyData, email) => {
    try {
        const data = { email: email,univercityName:bodyData.univercityName}
        const saveData = new univercityModel(data)        
        await saveData.save()
        return { status: true, subcode: 200, message: "univercity added successfully ", data:saveData }
    } catch (error) {
        console.log("Helper Err:",error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.removeUnivercity = async (id) =>{
    try {
        const data = await univercityModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "Univercity Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:",error);
        return { status: false, subcode: 400, message: error.message }
    }
}
exports.searchUnivercity = async (bodyData) => {
        try {

            // Use Mongoose to find CareerTransitionss that match the search term in their CareerTransitionsName field
            const data = await univercityModel.find({ univercityName: { $regex: bodyData.univercityName, $options: 'i' } });

            if (data || data.length) {
                return {
                    status: true,
                    subcode: 200,
                    message: "data retrieved successfully.",
                    data: data
                };
            }
            return {
                status: false,
                subcode: 404,
                message: "No data found with the given search term.",
                data: []
            };
        } catch (error) {
            console.error("Helper Err:", error);
            return {
                status: false,
                subcode: 400,
                message: error.message,
                data: []
            };
        }
    };


exports.activeUnivercity = async (id) => {
    try {
        const data = await univercityModel.findOne({ _id: id, isDelete: false });
        if (data) {
            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subcode: 200, message: "univercity activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "univercity deactivated successfully", data: data };
            }
        }
        return {
            status: false, subcode: 400, message: "data not found", data: data
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.editUnivercity =async (bodyData, id) =>{
    try {
        const name = bodyData.univercityName
        const data = await univercityModel.findOneAndUpdate(
            {_id:id },
            { univercityName:name },
            { new: true, select: '-_id -__v  -isActive'}
          );   
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "univercity not found.", data: null };
        }

        return { status: true, subcode: 200, message: "univercity updated successfully ", data:data }
    } catch (error) {
        console.log("Helper Err:",error);
        return { status: false, subcode: 400, message: error.message }
    }
}
exports.getOneUnivercity = async(id) =>{
    try {
        const data =await univercityModel.findOne({_id:id})
        if (data.isActive===true)
        {return { status: true, subcode: 200, message: "univercity get successfully ", data:data }}
        else
    {return { status: false, subcode: 400, message: "data not exist" }}
     } catch (error) {
        console.log("Helper Err:",error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.getAllUnivercity = async() =>{
    try {
        const universities = await univercityModel.find();

        // Filter the universities based on isActive and isDelete conditions
        const adminUniversities = [];
        const userUniversities = [];
        universities.forEach(university => {
            if (university.isActive === true && university.isDelete === false) {
                adminUniversities.push(university);
                userUniversities.push(university);
            } else if (university.isActive === false && university.isDelete === false) {
                adminUniversities.push(university);
            }
        });

        if (adminUniversities.length === 0) {
            // No universities exist for admin
            return { status: false, subcode: 400, message: "No universities found for admin.", data: [] };
        }

        // if (userUniversities.length === 0) {
        //     // No universities exist for user
        //     return { status: false, subcode: 400, message: "No universities found for user.", data: [] };
        // }
        
        adminUniversities.reverse()
        userUniversities.reverse()
        return {
            status: true,
            subcode: 200,
            message: "Universities retrieved successfully.",
            data: {
                adminUniversities,
                userUniversities
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
   
}
