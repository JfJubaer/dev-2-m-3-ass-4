import express from 'express';
import { orderValidation } from './order.validation';
import validateRequest from '../../middlewares/validateRequest';
import { orderController } from './order.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(orderValidation.orderValidationSchema),
  orderController.createorder,
);
router.get('/', orderController.getAllorders);

export const orderRoutes = router;
