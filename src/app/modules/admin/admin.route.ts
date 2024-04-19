import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validations';
import { AdminController } from './admin.controller';
const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.adminValidationSchema),
  AdminController.createAdmin,
);
router.post(
  '/login',
  validateRequest(AdminValidation.loginZodSchema),
  AdminController.loginAdmin,
);

router.get('/', AdminController.getAllAdmins);

export const adminRoutes = router;
