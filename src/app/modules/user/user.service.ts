import { IUser } from './user.interfaces';
import { User } from './user.model';

const createStudent = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

export const UserService = {
  createStudent,
};
