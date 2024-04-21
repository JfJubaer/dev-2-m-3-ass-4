import express from 'express';
import { orderValidation } from './order.validation';
import validateRequest from '../../middlewares/validateRequest';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/enum';
import authForOrders from '../../middlewares/authForOrders';

const router = express.Router();

router.post(
  '/',
  validateRequest(orderValidation.orderValidationSchema),
  auth(ENUM_USER_ROLE.BUYER),
  orderController.createorder,
);
router.get(
  '/',
  authForOrders(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.SELLER,
  ),
  orderController.getAllorders,
);

export const orderRoutes = router;
