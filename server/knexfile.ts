// Update with your config settings.

const dotenv = require('dotenv');
const { resolve } = require('path');

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: resolve(__dirname, 'src', 'database', 'migrations'),
    tableName: 'knex_migrations',
  },
};
