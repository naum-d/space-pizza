import express from 'express';
import cors from 'cors';

import userRouter from './models/users/user.router';
import { handleError } from './components/handleError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  handleError(err, res);
});

export default app;
