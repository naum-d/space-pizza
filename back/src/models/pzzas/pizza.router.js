import { Router } from 'express';

import * as PIZZA from './pizza.control';

const pizzaRouter = Router();

pizzaRouter.get('/', PIZZA.getAllPizzas);

export default pizzaRouter;
