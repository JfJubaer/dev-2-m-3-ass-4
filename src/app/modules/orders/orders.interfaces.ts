import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interfaces';
import { ICow } from '../cow/cow.interface';

export type Iorder = {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IUser;
};

export type OrderModel = Model<Iorder, Record<string, unknown>>;
