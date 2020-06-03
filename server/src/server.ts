/* eslint-disable import/first */
import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

import './database/connection';
import routes from './routes';

const app = express();

// Middlewares
app.use(express.json());

// Settings
app.set('PORT', process.env.PORT || 3333);

// Routes
app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(app.get('PORT'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on *:${app.get('PORT')}`);
});
