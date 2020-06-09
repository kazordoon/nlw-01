import request from 'supertest';
import { resolve } from 'path';
import querystring from 'querystring';

import app from '../src/app';
import connection from '../src/database/connection';
import point from './mock/point';

describe('Points', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    await connection.seed.run();
  });

  afterAll(async (done) => {
    await connection.destroy();
    return done();
  });

  it('should create a new point', async () => {
    const response = await request(app)
      .post('/points')
      .field('name', point.name)
      .field('email', point.email)
      .field('city', point.city)
      .field('uf', point.uf)
      .field('latitude', point.latitude)
      .field('longitude', point.longitude)
      .field('whatsapp', point.whatsapp)
      .field('items', point.items)
      .attach('image', point.image);

    expect(response.status).toBe(201);
  });

  it('should return status code 400 when trying to create a new point with an invalid file', async () => {
    const response = await request(app)
      .post('/points')
      .field('name', point.name)
      .field('email', point.email)
      .field('city', point.city)
      .field('uf', point.uf)
      .field('latitude', point.latitude)
      .field('longitude', point.longitude)
      .field('whatsapp', point.whatsapp)
      .field('items', point.items)
      .attach('image', point.invalidImage);

    expect(response.status).toBe(400);
  });

  it('should return status code 400 when trying to create a new point with a large image', async () => {
    const response = await request(app)
      .post('/points')
      .field('name', point.name)
      .field('email', point.email)
      .field('city', point.city)
      .field('uf', point.uf)
      .field('latitude', point.latitude)
      .field('longitude', point.longitude)
      .field('whatsapp', point.whatsapp)
      .field('items', point.items)
      .attach('image', point.largeImage);

    expect(response.status).toBe(400);
  });

  it('should return status code 400 when trying to create a new point without the point table', async () => {
    await connection.migrate.rollback();

    const response = await request(app)
      .post('/points')
      .field('name', point.name)
      .field('email', point.email)
      .field('city', point.city)
      .field('uf', point.uf)
      .field('latitude', point.latitude)
      .field('longitude', point.longitude)
      .field('whatsapp', point.whatsapp)
      .field('items', point.items)
      .attach('image', point.image);

    expect(response.status).toBe(400);
  });

  it('should list filtered points', async () => {
    // Creating a new point
    await request(app)
      .post('/points')
      .field('name', point.name)
      .field('email', point.email)
      .field('city', point.city)
      .field('uf', point.uf)
      .field('latitude', point.latitude)
      .field('longitude', point.longitude)
      .field('whatsapp', point.whatsapp)
      .field('items', point.items)
      .attach('image', point.image);

    const parsedCity = querystring.escape('Rio de Janeiro');
    const response = await request(app)
      .get('/points')
      .query('uf=RJ')
      .query(`city=${parsedCity}`)
      .query('items=1');

    expect(response.status).toBe(200);
  });

  it('should return status code 500 when trying to list the points without the point table', async () => {
    await connection.migrate.rollback();

    const parsedCity = querystring.escape('Rio de Janeiro');
    const response = await request(app)
      .get('/points')
      .query('uf=RJ')
      .query(`city=${parsedCity}`)
      .query('items=1');

    expect(response.status).toBe(500);
  });

  it('should return status code 400 when no point is found', async () => {
    const invalidPointId: number = Math.floor(Math.random() * 100);
    const response = await request(app)
      .get(`/points/${invalidPointId}`);

    expect(response.status).toBe(400);
  });

  it('should return a point by id', async () => {
    const newPoint = await request(app)
      .post('/points')
      .field('name', point.name)
      .field('email', point.email)
      .field('city', point.city)
      .field('uf', point.uf)
      .field('latitude', point.latitude)
      .field('longitude', point.longitude)
      .field('whatsapp', point.whatsapp)
      .field('items', point.items)
      .attach('image', point.image);

    const pointId: number = newPoint.body.id;

    const response = await request(app)
      .get(`/points/${pointId}`);

    expect(response.status).toBe(200);
  });

  it('should return status code 400 when trying to list a specific point without point table', async () => {
    await connection.migrate.rollback();

    const response = await request(app)
      .get('/points/1');

    expect(response.status).toBe(400);
  });
});
