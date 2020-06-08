/* eslint-disable import/first */
import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import { errors } from 'celebrate';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: resolve(__dirname, '..', '.env.test'),
  });
}

import './database/connection';
import routes from './routes';

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();

    this.settings();
    this.middlewares();
    this.routes();
    this.validationErrors();
  }

  private settings() {
    this.app.set('HOST', process.env.HOST || 'localhost');
    this.app.set('PORT', process.env.PORT || 3333);
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN,
    }));
  }

  private routes() {
    this.app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')));
    this.app.use(routes);
  }

  private validationErrors() {
    this.app.use(errors());
  }
}

const { app } = new App();

export default app;
