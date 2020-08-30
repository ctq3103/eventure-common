import mongoose, { Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

declare global {
	namespace Express {
		interface Response {
			advancedResults: object;
		}
	}
}

export const advancedResults = (
	Model: Model<mongoose.Document>,
	populate?: string
) => async (req: Request, res: Response, next: NextFunction) => {
	let query;

	//Copy req.query
	const reqQuery = { ...req.query }; // req.query { price: { gt: '50' } }

	// Fields to exclude
	const removeFields = ['select', 'sort', 'page', 'limit'];

	//Loop over removeFields and delete them
	removeFields.forEach((param) => delete reqQuery[param]);

	//Create query string
	let queryStr = JSON.stringify(reqQuery); // queryStr  {"price":{"$gt":"50"}}

	//Create operators
	queryStr = queryStr.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`
	);

	//Find resource
	query = Model.find(JSON.parse(queryStr));

	//Select fields
	if (req.query.select) {
		const fields = (<string>req.query.select).split(',').join(' ');
		query = query.select(fields);
	}

	//Sorting fields
	if (req.query.sort) {
		const sortBy = (<string>req.query.sort).split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('+datetime');
	}

	//Pagination
	const page = parseInt(<string>req.query.page, 10) || 1;
	const limit = parseInt(<string>req.query.limit, 10) || 100;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await Model.countDocuments();

	query = query.skip(startIndex).limit(limit);

	//Execute query
	const results = await query;

	//Pagination result
	let pagination = {};
	if (endIndex < total) {
		pagination = {
			next: {
				page: page + 1,
				limit,
			},
		};
	}
	if (startIndex > 0) {
		pagination = {
			prev: {
				page: page - 1,
				limit,
			},
		};
	}

	res.advancedResults = {
		count: results.length,
		pagination,
		data: results,
	};

	next();
};
