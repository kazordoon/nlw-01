/* eslint-disable import/first */
import dotenv from 'dotenv';
import { resolve } from 'path';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: resolve(__dirname, '..', '.env.test'),
  });
}

import app from './app';

app.listen(app.get('PORT'), app.get('HOST'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on ${app.get('HOST')}:${app.get('PORT')}`);
});
