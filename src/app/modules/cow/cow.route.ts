import express from 'express';
import { cowValidation } from './cow.validation';
import validateRequest from '../../middlewares/validateRequest';
import { CowController } from './cow.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/enum';

const router = express.Router();

router.post(
  '/',
  validateRequest(cowValidation.cowValidationSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow,
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getOneCow,
);
router.patch(
  '/:id',
  validateRequest(cowValidation.cowUpdateValidationSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.updateOneCow,
),
  router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SELLER),
    CowController.deleteOneCow,
  ),
  router.get(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
    CowController.getAllcows,
  );

export const CowRoutes = router;
