import { IUser } from './user.interfaces';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

const getAllusersFromDB = async (): Promise<IUser[]> => {
  const result = User.find({});
  console.log('hiited', result);
  return result;
};

export const UserService = {
  createUser,
  getAllusersFromDB,
};
