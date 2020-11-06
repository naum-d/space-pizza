import User from './user.model';
import { getUniqueKey } from '../../helpers';

export const signUpUser = async (req, res, next) => {
  const { body: { email, ...body } } = req;
  const oldUser = await User.findOne({ email });

  if (!!oldUser) return res.status(403).send({ email: 'Already Exist' });

  try {
    const newUser = await User.create({ email, ...body });
    const user = await User.findById(newUser._id).select('-password');
    return res.status(201).send({ ...user.toJSON(), token: getUniqueKey().toString() });
  } catch (e) {
    next(e);
  }
};

export const signInUser = async (req, res, next) => {
  const { body: { email, password } } = req;
  const oldUser = await User.findOne({ email });

  if (!oldUser) return res.status(404).send({ email: 'Not Found' });
  if (password !== oldUser.password) return res.status(403).send({ password: 'Invalid Password' });

  const user = await User.findById(oldUser._id).select('-password');
  return res.status(201).send({ ...user.toJSON(), token: getUniqueKey().toString() });
};

export const deleteUser = async (req, res, next) => {
  const { params: { id: _id } } = req;
  try {
    const oldUser = await User.findById(_id);
    if (!oldUser) return res.status(404).send({ error: 'Not Found' });
    await User.deleteOne({ _id });
    return res.status(201);
  } catch (e) {
    next(e);
  }
};
