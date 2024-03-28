import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const result = (await Cow.create(cow)).populate('seller');
  return result;
};
const getAllCowsFromDB = async (): Promise<ICow[]> => {
  const result = await Cow.find();
  return result;
};

export const cowService = {
  createCow,
  getAllCowsFromDB,
};
