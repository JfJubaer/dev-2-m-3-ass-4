import mongoose from 'mongoose';
import { Order } from './order.model';
import { Iorder } from './orders.interfaces';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Cow } from '../cow/cow.model';
import { User } from '../user/user.model';

const createorder = async (payload: Iorder): Promise<Iorder | null> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //array
    const newCow = await Cow.findOneAndUpdate(
      { _id: payload.cow },
      { label: 'sold out' },
      { session },
    );

    if (!newCow) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update cow');
    }

    const order = await Order.create([payload], { session });

    if (!order.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create  order');
    }

    const buyer = await User.findOne({ _id: payload.buyer });
    const cow = await Cow.findOne({ _id: payload.cow });
    const seller = await User.findOne({ _id: cow?.seller });

    let buyermoney = 0;
    let sellermoney = 0;

    if (buyer && seller && cow) {
      buyermoney = buyer.budget - cow.price;
      sellermoney = seller.income + cow.price;
    }

    const newbuyer = await User.findOneAndUpdate(
      { _id: payload?.buyer },
      { budget: buyermoney },
      { session },
    );

    if (!newbuyer) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update buyer');
    }
    const newSeller = await User.findOneAndUpdate(
      { _id: cow?.seller },
      { income: sellermoney },
      { session },
    );

    if (!newSeller) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update seller');
    }

    console.log(buyermoney, sellermoney);

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  const result = await Order.findOne({ buyer: payload.buyer });
  return result;
};

const getAllordersFromDB = async (): Promise<Iorder[]> => {
  const result = await Order.find();
  return result;
};

export const orderService = {
  createorder,
  getAllordersFromDB,
};
