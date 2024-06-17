import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import errorHandler from './middlewares/errorMiddleware.js';
import contactsRouter from './routes/contactsRouter.js';

const app = express();

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
