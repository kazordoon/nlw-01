import request from 'supertest';

import app from '../src/app';
import connection from '../src/database/connection';

describe('Items', () => {
  beforeAll(async () => {
    await connection.migrate.latest();
    await connection.seed.run();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should list all the items', async () => {
    const response = await request(app)
      .get('/items');

    expect(response.status).toBe(200);
  });

  it('should return status code 500 when trying to list all items without the item table', async () => {
    await connection.migrate.rollback();
    const response = await request(app)
      .get('/items');

    expect(response.status).toBe(500);
  });
});
