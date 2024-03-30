import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interfaces';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

const getAllusersFromDB = async (): Promise<IUser[]> => {
  const result = User.find({});
  return result;
};

const getOneUsersFromDB = async (id: string): Promise<IUser | null> => {
  const result = User.findOne({ _id: id });
  return result;
};

const updateOneUserFromDB = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  const { name, ...cowUser } = payload;
  const updatedcowUser: Partial<IUser> = { ...cowUser };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedcowUser as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await User.findOneAndUpdate({ _id: id }, updatedcowUser, {
    new: true,
  });
  return result;
};

const deleteOneUsersFromDB = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

export const UserService = {
  createUser,
  getAllusersFromDB,
  getOneUsersFromDB,
  updateOneUserFromDB,
  deleteOneUsersFromDB,
};
