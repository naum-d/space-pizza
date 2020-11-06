import 'dotenv/config';
import mongoose from 'mongoose';

import app from './src/app';

const PORT = process.env.PORT || 8000;

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Available on http://localhost:${PORT}`);
    });
  });
