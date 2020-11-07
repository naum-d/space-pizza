import mongoose from 'mongoose';

import BaseSchema from '../../components/BaseSchema';

const PizzaSchema = new BaseSchema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  usd: { type: Number, required: true },
  euro: { type: Number, required: true },
  img: { data: Buffer, dataType: String },
});

const Pizza = mongoose.model('Pizza', PizzaSchema);

export default Pizza;
