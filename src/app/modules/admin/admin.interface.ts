import { Model, Types } from 'mongoose';

export type IAdmin = {
  phoneNumber: string;
  _id: Types.ObjectId | IAdmin;
  role: 'admin';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
};

export type AdminModel = {
  isUserExist(
    // eslint-disable-next-line no-unused-vars
    phoneNumber: string,
  ): Promise<Pick<IAdmin, '_id' | 'role' | 'password'>>;
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    givenPassword: string,
    // eslint-disable-next-line no-unused-vars
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IAdmin>;
