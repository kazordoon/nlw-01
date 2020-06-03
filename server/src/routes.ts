import { Router } from 'express';
import knex from './database/connection';
import Item from './contracts/Item';
import Point from './contracts/Point';

const routes = Router();

routes.get('/items', async (req, res) => {
  try {
    const items = await knex<Item>('items').select('*');

    const serializedItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${item.image}`,
    }));
    return res.json(serializedItems);
  } catch (err) {
    return res.status(500).json({ error: "Couldn't list the items." });
  }
});

routes.post('/points', async (req, res) => {
  try {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const trx = await knex.transaction();

    const [pointId] = await trx<Point>('points')
      .insert({
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        image: 'fake_image',
      }).returning('id');

    const pointItems = items.map((itemId: number) => ({
      item_id: itemId,
      point_id: pointId,
    }));

    await trx('point_items')
      .insert(pointItems);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(400).json({ error: "Couldn't create a new point." });
  }
});

export default routes;
