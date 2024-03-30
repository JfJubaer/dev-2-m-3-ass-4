import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Iorder } from './orders.interfaces';
import { orderService } from './order.service';

const createorder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const order = req.body;

    const result = await orderService.createorder(order);

    sendResponse<Iorder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'order created successfully!',
      data: result,
    });
  },
);

const getAllorders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await orderService.getAllordersFromDB();
    sendResponse<Iorder[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'orders retrieved successfully',
      data: result,
    });
  },
);



export const orderController = {
  createorder,
  getAllorders,
};
