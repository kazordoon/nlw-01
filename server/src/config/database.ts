const { resolve } = require('path');

const dbConfig = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: resolve(__dirname, '..', 'database', 'migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: resolve(__dirname, '..', 'database', 'seeds'),
  },
};

export default dbConfig;
