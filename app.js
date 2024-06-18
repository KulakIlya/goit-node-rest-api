import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import errorHandler from './middlewares/errorMiddleware.js';
import contactsRouter from './routes/contactsRouter.js';

const app = express();
const uriDB = process.env.DB_HOST;

const connection = mongoose.connect(uriDB);

connection
  .then(() => console.log('Database connection successful'))
  .catch(() => {
    console.error('Error');
    process.exit(1);
  });

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running. Use our API on port: 3000');
});
