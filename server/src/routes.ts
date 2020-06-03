import { Router } from 'express';
import knex from './database/connection';
import Item from './contracts/Item';

const routes = Router();

routes.get('/items', async (req, res) => {
  try {
    const items = await knex<Item>('items').select('*');

    const serializedItems = items.map((item) => ({
      title: item.title,
      image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${item.image}`,
    }));
    return res.json(serializedItems);
  } catch (err) {
    return res.status(500).json({ error: "Couldn't list the items." });
  }
});

export default routes;
