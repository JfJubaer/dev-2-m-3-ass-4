import { Model, Types } from 'mongoose';

export type IAdmin = {
  phoneNumber: string;
  _id: Types.ObjectId;
  role: 'admin';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
};

export type AdminModel = {
  // isUserExist(
  //   phoneNumber: string,
  // ): Promise<Pick<IAdmin, '_id' | 'role' | 'password'>>;
  // isPasswordMatched(
  //   givenPassword: string,
  //   savedPassword: string,
  // ): Promise<boolean>;
} & Model<IAdmin>;

export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
