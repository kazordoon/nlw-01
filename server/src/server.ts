/* eslint-disable import/first */
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

import app from './app';

app.listen(app.get('PORT'), app.get('HOST'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on ${app.get('HOST')}:${app.get('PORT')}`);
});
