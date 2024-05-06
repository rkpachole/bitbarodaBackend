const { userModel } = require("../models/user.model")
const bcrypt = require('bcryptjs')
const secret_key = process.env.TOKEN_KEY


exports.paginationUser = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await userModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await userModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.addUser = async (bodyData, email) => {
    try {
        const user = await userModel.findOne({ userName: bodyData.name })
        // console.log(user);
        if (!user) {           
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(bodyData.password, salt);
            const {...data} =  bodyData
            data.password = hash
            const saveData = new userModel(data)
            // saveData.email = email
            await saveData.save()
            return { status: true, subcode: 200, message: "user added successfully ", data: saveData }
        } else {
            return { status: false, subcode: 400, message: "user already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.removeUser = async (id) => {
    try {
        const data = await userModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "user Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}


exports.searchUser = async (bodyData) => {
    try {
        const data = await userModel.find({ name: { $regex: bodyData.name, $options: 'i' } });
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
}

exports.activeUser = async (id) => {
    try {
        const data = await userModel.findOne({ _id: id, isDelete: false });
        if (data) {
            data.isActive = !data.isActive; // Toggle isActive value
            await data.save();
            if (data.isActive) {
                return { status: true, subcode: 200, message: "user activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "user deactivated successfully", data: data };
            }
        }
        return {
            status: false, subcode: 400, message: "data not found", data: data
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
};


exports.editUser = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await userModel.findOneAndUpdate(
            { _id: id },
            newData
            ,{ new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "user not found.", data: null };
        }
        return { status: true, subcode: 200, message: "user updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.getOneUser = async (id) => {
    try {
        const data = await userModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subcode: 200, message: "user get successfully ", data: data }
        } else {
            return { status: false, subcode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.getAllUser = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const user = await userModel.find();
        // Filter the user based on isActive and isDelete conditions
        const adminData = [];
        const usersData = [];
        user.forEach(user => {
            if (user.isActive === true && user.isDelete === false) {
                adminData.push(user);
                usersData.push(user);
            } else if (user.isActive === false && user.isDelete === false) {
                adminData.push(user);
            }
        });
        if (adminData.length === 0) {
            // No user exist for adminData
            return { status: false, subcode: 400, message: "No user found for adminData.", data: [] };
        }
        // if (usersData.length === 0) {
        //     // No user exist for user
        //     return { status: false, subcode: 400, message: "No user found for user.", data: [] };
        // }
        adminData.reverse();
        usersData.reverse()
        return {
            status: true,
            subcode: 200,
            message: "user retrieved successfully.",
            data: {
                adminData,
                usersData
            }
        }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
};

exports.loginUser = async(bodyData) =>{
    try {
        const data = bodyData;
        const user = await cuisineModel.findOne({ username: data.username })
        //console.log(user)
        if (user) {
            const hash = bcrypt.compareSync(data.password, user.password)
            if (hash === true) {
                await cuisineModel.updateOne(user,{ isVerified: true })
                // console.log(user)
                const id = user.userId                
                const token = generateToken(id,secret_key)
                // console.log(token)
                return { status: true, message: "login successfully", subcode: 200, data: user, token }
            } else {
                return { status: false, message: "User not found", subcode: 400 }
            }
        } else {
            return { status: false, message: "Invailid credintial", subcode: 400 }
        }
    }
    catch (err) {
        return { status: false, message: err.message, subcode: 400 }
    }
}
