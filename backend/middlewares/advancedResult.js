const asyncHandler = require('express-async-handler');

const advancedResults = (model, populate) =>
    asyncHandler(async (req, res, next) => {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };
        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit', 'search']; // Added 'search'

        // Extract search query and remove it from reqQuery
        const searchQuery = reqQuery.search;
        delete reqQuery.search;

        // Loop over removeFields and delete them from reqQuery
        removeFields.forEach((param) => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

        // Finding resource
        if (req.user) {
            query = model.find({
                ...JSON.parse(queryStr),
                userId: req.user._id,
            });
        } else {
            query = model.find({
                ...JSON.parse(queryStr),
            });
        }

        // Search
        if (searchQuery) {
            const searchFields = Object.keys(model.schema.paths).filter(
                (field) => field !== '_id' && field !== '__v'
            ); // Get all fields except _id and __v

            const searchFilters = searchFields.map((field) => {
                if (model.schema.paths[field].instance === 'String') {
                    return { [field]: { $regex: new RegExp(searchQuery, 'i') } };
                }
                return null;
            });

            query = query.or(searchFilters.filter((filter) => filter !== null));
        }

        // Select Fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await model.countDocuments(JSON.parse(queryStr));

        query = query.skip(startIndex).limit(limit);

        if (populate) {
            query = query.populate(populate);
        }

        let results;
        results = await query;

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            };
        }

        const responseData = {
            success: true,
            count: results.length,
            pagination,
            data: results,
        };

        res.advancedResults = responseData;

        next();
    });

module.exports = advancedResults;
