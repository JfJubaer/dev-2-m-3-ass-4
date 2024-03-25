import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/auth/signup',
  validateRequest(UserValidation.userValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
