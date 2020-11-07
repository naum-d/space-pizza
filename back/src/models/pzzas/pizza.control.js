import Pizza from './pizza.model';

export const getAllPizzas = async (req, res, next) => {
  try {
    const pizzas = await Pizza.find();
    return res.status(200).send(pizzas);
  } catch (e) {
    next(e);
  }
};
