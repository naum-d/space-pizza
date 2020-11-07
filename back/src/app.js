import express from 'express';
import cors from 'cors';

import { setUser } from './middlewares/setUser';
import { handleError } from './components/handleError';
import userRouter from './models/users/user.router';
import pizzaRouter from './models/pzzas/pizza.router';
import orderRouter from './models/order/order.router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(setUser);

app.use('/api/users', userRouter);
app.use('/api/pizzas', pizzaRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  handleError(err, res);
});

export default app;
