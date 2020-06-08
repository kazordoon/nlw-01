// Update with your config settings.

const dotenv = require('dotenv');
const { resolve } = require('path');

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: resolve(__dirname, '.env.test'),
  });
}

const { default: dbConfig } = require('./src/config/database');

module.exports = dbConfig;
