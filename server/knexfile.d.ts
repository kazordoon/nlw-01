import { Config } from 'knex';

const dbConfig: Config = {};

declare module knexfile {
  export default dbConfig;
}
