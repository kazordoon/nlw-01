import Knex from 'knex';

declare module 'knexfile' {
  const connection: Knex;
  export default connection;
}
