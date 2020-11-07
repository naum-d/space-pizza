import User from './user.model';

export const createUser = async (user, res) => {
  const { email } = user;
  const oldUser = await User.findOne({ email });

  if (!!oldUser) return res.status(403).send({ email: 'Already Exist' });

  const newUser = await User.create(user);
  return User.findById(newUser._id).select('-password');
};

export const signUpUser = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await createUser(body, res);
    return res.status(201).send({ ...user.toJSON(), token: user.generateAuthToken() });
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
  return res.status(201).send({ ...user.toJSON(), token: user.generateAuthToken() });
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
