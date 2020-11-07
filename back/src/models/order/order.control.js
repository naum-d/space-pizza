import Order from './order.model';
import Pizza from '../pzzas/pizza.model';
import { createUser } from '../users/user.control';

const getPrice = async ({ order, currency }) => {
  let price = 0;

  for (const { pizza: id, count } of order) {
    const pizza = await Pizza.findById(id);
    price += pizza[currency] * count;
  }

  return price;
};

export const addNewOrder = async (req, res, next) => {
  const { body: { user, order } } = req;
  let userId = req.user?._id;

  try {
    if (!!user) {
      const newUser = await createUser(user, res);
      userId = newUser._id
    }
    else {
      return res.status(404).send({ message: 'Need User' });
    }

    const totalPrice = await getPrice(order);
    const newOrder = await Order.create({ ...order, totalPrice, user: userId });
    return res.status(201).send(newOrder);
  } catch (e) {
    return next(e);
  }
};

export const getUserOrders = async (req, res, next) => {
  const { user: { _id } } = req;
  try {
    const orders = await Order.find({ user: _id }).select('-user').populate('order.pizza');
    return res.send(orders);
  } catch (e) {
    return next(e);
  }
};

export const deleteOrders = async (req, res, next) => {
  try {
    await Order.deleteMany({});
    res.status(200).send([]);
  } catch (e) {
    next(e);
  }
};

