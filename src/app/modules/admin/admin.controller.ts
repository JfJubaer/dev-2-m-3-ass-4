import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAdmin } from './admin.interface'; // Assuming you have defined the admin interfaces
import { AdminService } from './admin.service'; // Assuming you have an AdminService similar to UserService
// import config from '../../../config';

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const adminData = req.body;
    const result = await AdminService.createAdmin(adminData);

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  },
);

// const loginAdmin = catchAsync(async (req: Request, res: Response) => {
//   const { ...loginData } = req.body;
//   const result = await AdminService.loginUser(loginData);
//   const { refreshToken } = result;
//   // set refresh token into cookie
//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOptions);

//   sendResponse<ILoginUserResponse>(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User logged in successfully !',
//     data: result,
//   });
// });

const getAllAdmins: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminService.getAllAdminsFromDB();
    sendResponse<IAdmin[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admins retrieved successfully',
      data: result,
    });
  },
);

const getOneAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AdminService.getOneAdminFromDB(id);
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin retrieved successfully',
      data: result,
    });
  },
);

const updateOneAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AdminService.updateOneAdminFromDB(id, updatedData);
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin updated successfully',
      data: result,
    });
  },
);

const deleteOneAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AdminService.deleteOneAdminFromDB(id);
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin deleted successfully',
      data: result,
    });
  },
);

export const AdminController = {
  createAdmin,
  getAllAdmins,
  getOneAdmin,
  updateOneAdmin,
  deleteOneAdmin,
  // loginAdmin,
};
