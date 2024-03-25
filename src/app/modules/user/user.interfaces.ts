import { Model } from 'mongoose';

export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: string; // Savings for buying the cow
  income: string; // money from selling the cow
};

export type UserModel = Model<IUser, Record<string, unknown>>;
