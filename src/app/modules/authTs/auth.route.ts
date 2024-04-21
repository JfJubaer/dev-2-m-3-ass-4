import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from '../admin/admin.validations';
import { authController } from './auth.controller';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AdminValidation.loginZodSchema),
  authController.loginUser,
);
router.post(
  '/refresh-token/:refreshToken',
  validateRequest(AdminValidation.refreshTokenZodSchema),
  authController.refreshToken,
);

export const authRoutes = router;
