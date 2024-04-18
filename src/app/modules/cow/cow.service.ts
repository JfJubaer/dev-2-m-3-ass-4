import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/PaginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { cowsSearchableFields } from './cow.constants';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const result = (await Cow.create(cow)).populate('seller');
  return result;
};
const getAllCowsFromDB = async (
  filters: ICowFilters,
  paginaitions: IPaginationOptions,
): Promise<IGenericResponse<ICow[]>> => {
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

  if (filtersData.minPrice !== undefined) {
    andConditions.push({ price: { $gte: filtersData.minPrice } });
  }

  // Add condition for maxPrice
  if (filtersData.maxPrice !== undefined) {
    andConditions.push({ price: { $lte: filtersData.maxPrice } });
  }
  if (filtersData.location !== undefined) {
    andConditions.push({ location: { $eq: filtersData.location } });
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

const getOneCowFromDB = async (id: string): Promise<ICow | null> => {
  const result = Cow.findOne({ _id: id });
  return result;
};

const updateOneCowFromDB = async (
  id: string,
  payload: Partial<ICow>,
): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteOnecowFromDB = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete({ _id: id });
  return result;
};

export const cowService = {
  createCow,
  getAllCowsFromDB,
  getOneCowFromDB,
  updateOneCowFromDB,
  deleteOnecowFromDB,
};
