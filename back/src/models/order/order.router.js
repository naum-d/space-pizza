import { Router } from 'express';

import * as ORDER from './order.control';
import { hasAccess } from '../../middlewares/hasAccess';

const orderRouter = Router();

orderRouter.post('/', ORDER.addNewOrder);

orderRouter.get('/', hasAccess, ORDER.getUserOrders);

orderRouter.delete('/', hasAccess, ORDER.deleteOrders);

export default orderRouter;
