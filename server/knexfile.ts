// Update with your config settings.

const dotenv = require('dotenv');
const { resolve } = require('path');

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

const { default: dbConfig } = require('./src/config/database');

module.exports = {
  ...dbConfig,
  migrations: {
    directory: resolve(__dirname, 'src', 'database', 'migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: resolve(__dirname, 'src', 'database', 'seeds'),
  },
};
