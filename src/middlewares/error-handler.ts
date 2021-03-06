import { Response, Request, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { Error as MongooseError } from 'mongoose';

export const errorHandler = (
	err: Error | MongooseError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//Mongoose bad ObjectId
	if (err instanceof MongooseError.CastError) {
		const message = `Resource not found with ID of ${err.value}`;

		return res.status(404).send({
			errors: [{ message }],
		});
	}

	//Mongoose validation error
	if (err instanceof MongooseError.ValidationError) {
		const message = Object.values(err.errors).map((val) => val.message);
		return res.status(400).send({
			errors: [{ message }],
		});
	}

	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	}

	res.status(400).send({
		errors: [{ message: 'Something went wrong!' }],
	});

	console.error(err);
	next();
};
