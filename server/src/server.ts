/* eslint-disable import/first */
import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import { errors } from 'celebrate';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

import './database/connection';
import routes from './routes';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

// Settings
app.set('HOST', process.env.HOST || 'localhost');
app.set('PORT', process.env.PORT || 3333);

// Routes
app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')));
app.use(routes);

// Show validation errors
app.use(errors());

app.listen(app.get('PORT'), app.get('HOST'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on ${app.get('HOST')}:${app.get('PORT')}`);
});
