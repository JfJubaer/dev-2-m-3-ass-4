import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ICow } from './cow.interface';
import { cowService } from './cow.service';
import pick from '../../../shared/pick';
import { cowsFilterableFields } from './cow.constants';
import { paginationFields } from '../../../constants/pagination';

const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cow = req.body;

    const result = await cowService.createCow(cow);

    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'cow created successfully!',
      data: result,
    });
  },
);

const getAllcows: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {

    const filters = pick(req.query, cowsFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await cowService.getAllCowsFromDB(filters,paginationOptions);
    sendResponse<ICow[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cows retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

export const CowController = {
  createCow,
  getAllcows,
};
