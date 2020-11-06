import { Router } from 'express';
import * as USER from './user.control';

const userRouter = Router();

userRouter.post('/signUp', USER.signUpUser);
userRouter.post('/signIn', USER.signInUser);
userRouter.delete('/:id', USER.deleteUser);

export default userRouter;
