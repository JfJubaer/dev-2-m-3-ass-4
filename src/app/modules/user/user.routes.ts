import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/auth/signup',
  validateRequest(UserValidation.userValidationSchema),
  UserController.createUser,
);
router.get('/:id', UserController.getOneUser);

router.delete('/:id', UserController.deleteOneUser);

router.patch(
  '/:id',
  validateRequest(UserValidation.userUpdateValidationSchema),
  UserController.updateOneUser,
);
router.get('/', UserController.getAllusers);

export const UserRoutes = router;
