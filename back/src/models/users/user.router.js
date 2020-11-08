import { Router } from 'express';
import * as USER from './user.control';
import { hasAccess } from '../../middlewares/hasAccess';

const userRouter = Router();

userRouter.post('/signUp', USER.signUpUser);
userRouter.post('/signIn', USER.signInUser);
userRouter.delete('/:id', USER.deleteUser);
userRouter.get('/self', hasAccess, USER.getSelfUser);

export default userRouter;
