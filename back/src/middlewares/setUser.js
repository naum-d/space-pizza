import * as jwt from 'jsonwebtoken';
import User from '../models/users/user.model';

export const setUser = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return next();

    const { _id, email } = jwt.verify(token || '', process.env.JWT_SIGNATURE);
    const user = await User.findOne({ _id, email }).select('-password');
    req.user = user;

    return next();
  } catch (e) {
    next(e);
  }
};
