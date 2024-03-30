import express from 'express';
import { cowValidation } from './cow.validation';
import validateRequest from '../../middlewares/validateRequest';
import { CowController } from './cow.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(cowValidation.cowValidationSchema),
  CowController.createCow,
);
router.get('/:id', CowController.getOneCow);
router.patch('/:id',validateRequest(cowValidation.cowUpdateValidationSchema), CowController.updateOneCow),
router.delete('/:id', CowController.deleteOneCow),
router.get('/', CowController.getAllcows);

export const CowRoutes = router;
