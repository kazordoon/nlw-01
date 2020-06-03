import dotenv from 'dotenv';
import express from 'express';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

// eslint-disable-next-line import/first
import './database/connection';
// eslint-disable-next-line import/first
import routes from './routes';

const app = express();

app.set('PORT', process.env.PORT || 3333);

app.use(routes);

app.listen(app.get('PORT'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on *:${app.get('PORT')}`);
});
