import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwthelpers';
import { Order } from '../modules/orders/order.model';
import { Cow } from '../modules/cow/cow.model';

const authForOrders =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      //   req.user = verifiedUser; // role , userid

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      if (verifiedUser.role === 'buyer') {
        const result = await Order.find({ buyer: verifiedUser._id });
        if (!result.length) {
          throw new ApiError(httpStatus.FORBIDDEN, 'Goru na kina tamasha??');
        }
      }
      if (verifiedUser.role === 'seller') {
        const result = await Cow.find({ seller: verifiedUser._id });
        if (!result.length) {
          throw new ApiError(httpStatus.FORBIDDEN, 'Goru na beicha tamasha??');
        } else {
          const newResult = result.map(async cow =>
            Order.find({ buyer: cow._id }),
          );
          if (!newResult.length) {
            throw new ApiError(
              httpStatus.FORBIDDEN,
              'Goru na beicha tamasha??',
            );
          }
        }
      }
      // console.log(verifiedUser);
      next();
    } catch (error) {
      next(error);
    }
  };

export default authForOrders;
