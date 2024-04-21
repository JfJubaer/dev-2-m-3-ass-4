import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Iorder } from './orders.interfaces';
import { orderService } from './order.service';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwthelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

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
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    // verify token
    let verifiedUser = null;

    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
    const result = await orderService.getAllordersFromDB(
      verifiedUser.role,
      verifiedUser._id,
    );
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
