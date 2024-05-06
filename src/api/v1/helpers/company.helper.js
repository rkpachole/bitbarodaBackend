const { companyModel } = require("../models/companyLogo.model")

exports.paginationCompany = async (bodyData) => {
    try {
        const page = parseInt(bodyData) || 1;
        const perPage = 10;
        const totalLeads = await companyModel.countDocuments();
        // console.log(totalLeads)
        const totalPages = Math.ceil(totalLeads / perPage);
        const Leads = await companyModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        return { status: true, subcode: 200, message: "Pagination done successfully.", data: { Leads, totalPages } }
    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
}

exports.addCompany = async (bodyData, email) => {
    try {
        const company = await companyModel.findOne({ name: bodyData.name })
        // console.log(company);
        if (!company) {
            // const {} =  bodyData;
            const saveData = new companyModel(bodyData)
            saveData.email = email
            await saveData.save()
            return { status: true, subcode: 200, message: "company added successfully ", data: saveData }
        } else {
            return { status: false, subcode: 400, message: "company already exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.removeCompany = async (id) => {
    try {
        const data = await companyModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            { isActive: false, isDelete: true },
            { new: true }
        );
        if (data)
            return { status: true, subcode: 200, message: "company Deleted successfully ", data: data }
        else
            return { status: false, subcode: 400, message: "data not found ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}

exports.searchCompany = async (bodyData) => {
    try {

        // Use Mongoose to find CareerTransitionss that match the search term in their CareerTransitionsName field
        const data = await companyModel.find({ name: { $regex: bodyData.name, $options: 'i' } });

        if (data.length === 0) {
            // If no matching CareerTransitionss are found, return an appropriate response
            return {
                status: false,
                subcode: 404,
                message: "No data found with the given search term.",
                data: []
            };
        }

        // Return the matching CareerTransitionss as the API response
        return {
            status: true,
            subcode: 200,
            message: "data retrieved successfully.",
            data: data
        }; if (data || data.length) {
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

exports.activeCompany = async (id) => {
    try {
        const data = await companyModel.findOne({ _id: id, isDelete: false });
        if (data) {

            data.isActive = !data.isActive; // Toggle isActive value

            await data.save();

            if (data.isActive) {
                return { status: true, subcode: 200, message: "company activated successfully", data: data };
            } else {
                return { status: true, subcode: 200, message: "company deactivated successfully", data: data };
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


exports.editCompany = async (bodyData, id) => {
    try {
        const { ...newData } = bodyData
        const data = await companyModel.findOneAndUpdate(
            { _id: id },
            newData
            , { new: true }
        );
        if (data.isDelete === true) {
            // Course with the given id not found
            return { status: false, subcode: 404, message: "company not found.", data: null };
        }
        return { status: true, subcode: 200, message: "company updated successfully ", data: data }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}
exports.getOneCompany = async (id) => {
    try {
        const data = await companyModel.findOne({ _id: id })
        if (data.isActive === true) {
            return { status: true, subcode: 200, message: "company get successfully ", data: data }
        } else {
            return { status: false, subcode: 400, message: "data not exist" }
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message }
    }
}



exports.getAllCompany = async () => {
    try {
        // Find all categories, excluding the '__v' and 'isActive' fields
        const company = await companyModel.find();

        // Filter the company based on isActive and isDelete conditions
        const admincompany = [];
        const usercompany = [];
        company.forEach(company => {
            if (company.isActive === true && company.isDelete === false) {
                admincompany.push(company);
                usercompany.push(company);
            } else if (company.isActive === false && company.isDelete === false) {
                admincompany.push(company);
            }
        });

        if (admincompany.length === 0) {
            // No company exist for admin
            return { status: false, subcode: 400, message: "No company found for admin.", data: [] };
        }

        // if (usercompany.length === 0) {
        //     // No company exist for user
        //     return { status: false, subcode: 400, message: "No company found for user.", data: [] };
        //  }
        admincompany.reverse();
        usercompany.reverse()
        return {
            status: true,
            subcode: 200,
            message: "company retrieved successfully.",
            data: {
                admincompany,
                usercompany
            }
        }

    } catch (error) {
        console.error("Helper Err:", error);
        return { status: false, subcode: 400, message: error.message };
    }
};
