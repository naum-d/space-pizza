import BaseSchema from '../../components/BaseSchema';
import mongoose from 'mongoose';

const OrderSchema = new BaseSchema({
  user: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
  order: [
    {
      pizza: { type: mongoose.Schema.Types.ObjectID, ref: 'Pizza' },
      price: Number,
      count: Number,
      _id: false,
    },
  ],
  totalPrice: Number,
  currency: { type: String, enum: ['usd', 'euro'] },
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
