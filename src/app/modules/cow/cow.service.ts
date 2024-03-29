import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/PaginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { cowsSearchableFields } from './cow.constants';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';
import { IGenericResponse } from '../../../interfaces/common';

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const result = (await Cow.create(cow)).populate('seller');
  return result;
};
const getAllCowsFromDB = async (filters:ICowFilters,paginaitions:IPaginationOptions): Promise<IGenericResponse<ICow[]>> => {

  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginaitions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowsSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

    // console.log(result)

  const total = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const cowService = {
  createCow,
  getAllCowsFromDB,
};
