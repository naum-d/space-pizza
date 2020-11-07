import fs from 'fs';
import 'dotenv/config';
import mongoose from 'mongoose';

import data from './data/pizza.json';
import Pizza from './src/models/pzzas/pizza.model';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => await Pizza.deleteMany({}))
  .then(async () => {
    for (const { image, ...body } of data) {
      console.log(image, body);
      const img = { data: fs.readFileSync(`./data/img/${image}`), contentType: 'image/jpg' };
      const pizza = await Pizza.create({ img, ...body });
      console.log('NEW PIZZA', pizza.name);
    }
  })
  .finally(() => mongoose.connection.close());
