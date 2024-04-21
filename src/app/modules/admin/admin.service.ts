import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdmin } from './admin.interface'; // Assuming you have defined the admin interfaces
import { Admin } from './admin.model'; // Assuming you have created an Admin model
import { jwtHelpers } from '../../../helpers/jwthelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { ILoginUser, ILoginUserResponse } from '../authTs/auth.interface';

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  const result = await Admin.create(admin);
  return result;
};

const getAllAdminsFromDB = async (): Promise<IAdmin[]> => {
  const result = Admin.find({});
  return result;
};

const getOneAdminFromDB = async (id: string): Promise<IAdmin | null> => {
  const result = Admin.findOne({ _id: id });
  return result;
};

const updateOneAdminFromDB = async (
  id: string,
  payload: Partial<IAdmin>,
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }
  const { name, ...adminData } = payload;
  const updatedAdminData: Partial<IAdmin> = { ...adminData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate({ _id: id }, updatedAdminData, {
    new: true,
  });
  return result;
};

const deleteOneAdminFromDB = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete({ _id: id });
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  const isUserExist = await Admin.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { _id, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { _id, role, phoneNumber },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role, phoneNumber },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AdminService = {
  createAdmin,
  getAllAdminsFromDB,
  getOneAdminFromDB,
  updateOneAdminFromDB,
  deleteOneAdminFromDB,
  loginUser,
};
