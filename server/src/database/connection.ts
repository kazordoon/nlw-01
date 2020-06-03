import knex from 'knex';

import { dbConfig } from '../../knexfile';

const connection = knex(dbConfig);
// eslint-disable-next-line no-console
console.log('Database connected');

export default connection;
