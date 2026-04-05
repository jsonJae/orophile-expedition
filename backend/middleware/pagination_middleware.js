import User from '../models/user_model.js';

const isValidPagination = (defaultLimit = 10, maxLimit = 50) => 
    { return async (req, res, next) => {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const limit = Math.max(1,parseInt(req.query.limit) || defaultLimit);


            if (limit > maxLimit) {
                return res.status(400).json({ message: `Max limit for a page is ${maxLimit} items` });
            }

            const totalUsers = await User.countDocuments({role: "user"});

            if(!totalUsers){
                return res.status(200).json({message: "No users to display", totalUsers: 0 });
            }
            const totalPages = Math.ceil(totalUsers/limit);

            if(page > totalPages){
                return res.status(400).json({message: `Max page is page ${totalPages}`});
            }

            const skip = (page - 1) * limit;

            req.pagination = {
                page,
                limit,
                skip,
                totalUsers,
                totalPages,
            };

            next();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};

const isValidSorting = (req, res, next) => {
    try{
        const validSortBy = [
        "name.first_name", 
        "name.last_name", 
        "age", 
        "username", 
        "email",
        "-createdAt" 
        ];
    
        const sortByInput = [].concat(req.query.sortBy || "-createdAt"); 
        const sortObj = {};

        for (let sortField of sortByInput) {
            let order = 1;

            if (!validSortBy.includes(sortField)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid sort field: '${sortField}'. Allowed fields are: ${validSortBy.join(", ")}`
                });
            }
            sortObj[sortField] = order;
        }

        req.sorting = sortObj;
        next();
    }catch{
        res.status(500).json({error: error.message});
    }

};

export { isValidPagination, isValidSorting};