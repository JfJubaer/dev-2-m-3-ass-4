import { Model, Types } from 'mongoose';

export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  _id: Types.ObjectId | IUser;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number; // Savings for buying the cow
  income: number; // money from selling the cow
};

export type UserModel = {
  isUserExist(
    // eslint-disable-next-line no-unused-vars
    phoneNumber: string,
  ): Promise<Pick<IUser, '_id' | 'role' | 'password'>>;
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    givenPassword: string,
    // eslint-disable-next-line no-unused-vars
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
